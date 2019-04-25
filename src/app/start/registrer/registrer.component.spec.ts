import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrerComponent } from './registrer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

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
});
