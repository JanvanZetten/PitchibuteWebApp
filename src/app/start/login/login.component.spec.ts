import { auth } from 'firebase/app';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { $ } from 'protractor';
import { By } from '@angular/platform-browser';
import { Input } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { RegistrerComponent } from '../registrer/registrer.component';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, RegistrerComponent]
      ,
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('showModal should be true when registerNewUser() is called', () => {
    component.showModal = false;
    expect(component.showModal).toBe(false)
    component.registerNewUser()
    expect(component.showModal).toBe(true)
    component.showModal = true;
    component.registerNewUser()
    expect(component.showModal).toBe(true)
  })

  it('showModal should be false when removeModal() is called', () => {
    component.showModal = true;
    expect(component.showModal).toBe(true)
    component.removeModal()
    expect(component.showModal).toBe(false)
    component.showModal = false;
    component.removeModal()
    expect(component.showModal).toBe(false)
  })

  it('showModal should be false when userRegistred is called', () => {
    component.showModal = true;
    expect(component.showModal).toBe(true)
    component.userRegistred({})
    expect(component.showModal).toBe(false)
    component.showModal = false;
    component.userRegistred({})
    expect(component.showModal).toBe(false)
  })

  it('should set error messages to null when resetErrors() is called', () => {
    const emailPassErrTestMsg = "Some random string that represents the email/password error message"
    const googleLoginErrTestMsg = "Some random string that represents the google login error message"
    component.emailPasswordError = emailPassErrTestMsg
    component.googleloginError = googleLoginErrTestMsg
    expect(component.emailPasswordError).toBe(emailPassErrTestMsg)
    expect(component.googleloginError).toBe(googleLoginErrTestMsg)

    component.resetErrors()
    expect(component.emailPasswordError).toBeNull
    expect(component.googleloginError).toBeNull

    component.emailPasswordError = null
    component.googleloginError = null

    component.resetErrors()
    expect(component.emailPasswordError).toBeNull
    expect(component.googleloginError).toBeNull
  })

  it('should route to /home when routeToHome() is called', () => {
    const router: Router = TestBed.get(Router);
    spyOn(router, 'navigateByUrl');

    component.routeToHome()

    expect(router.navigateByUrl).
      toHaveBeenCalledWith(router.createUrlTree([`home`]),
        { skipLocationChange: false });
  })

});
