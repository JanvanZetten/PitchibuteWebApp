import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrerComponent } from './registrer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { By } from '@angular/platform-browser';

describe('RegistrerComponent', () => {
  let component: RegistrerComponent;
  let fixture: ComponentFixture<RegistrerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrerComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show an error if the password dont match', () => {
    const pass1 = "aPassword1234"
    const pass2 = "anotherPassword1234"
    setInputValue("#password", pass1)
    setInputValue("#confirmPassword", pass2)
    fixture.detectChanges()
    component.checkPasswordMatch()
    fixture.detectChanges()

    var alert = fixture.debugElement.queryAll(By.css(".red-text"))

    expect(alert.length).toBe(1)
  });

  it('should not show error if the passwords match', () => {
    const pass = "thePassword1234"
    setInputValue("#password", pass)
    setInputValue("#confirmPassword", pass)
    fixture.detectChanges()
    component.checkPasswordMatch()
    fixture.detectChanges()

    var alert = fixture.debugElement.queryAll(By.css(".red-text"))

    expect(alert.length).toBe(0)
  });

  it('should call createUserWithEmailAndPassword on register', () => {
    const afAuth = TestBed.get(AngularFireAuth)

    var promise = new Promise((resolve, reject) => {
    });

    spyOn(afAuth.auth, 'createUserWithEmailAndPassword').and.returnValue(promise)

    component.registrer()

    expect(afAuth.auth.createUserWithEmailAndPassword).toHaveBeenCalledTimes(1)
  });

  it('should call createUserWithEmailAndPassword with the given email and password', () => {
    const afAuth = TestBed.get(AngularFireAuth)
    var promise = new Promise((resolve, reject) => {
    });
    const email = "the-test@mail.com"
    const pass = "thePassword1234"
    setInputValue("#email", email)
    setInputValue("#password", pass)
    setInputValue("#confirmPassword", pass)
    fixture.detectChanges()

    spyOn(afAuth.auth, 'createUserWithEmailAndPassword').and.returnValue(promise)

    component.registrer()

    expect(afAuth.auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(email, pass)
  });

  function setInputValue(selector: string, value: string) {
    fixture.detectChanges();
    let input = fixture.debugElement.query(By.css(selector)).nativeElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }
});
