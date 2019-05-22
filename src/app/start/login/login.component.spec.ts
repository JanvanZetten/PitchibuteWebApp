import {ReactiveFormsModule} from '@angular/forms';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {RegistrerComponent} from '../registrer/registrer.component';
import {AngularFireAuthModule, AngularFireAuth} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from 'src/environments/environment';
import {Router} from '@angular/router';
import { Subject, ReplaySubject } from 'rxjs';
import {AuthenticationService} from '../../shared/authentication/authentication-service/authentication.service';
import {RecaptchaModule} from 'ng-recaptcha';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authStub: any;
  let authService: AuthenticationService;
  let promise: Promise<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, RegistrerComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
        RecaptchaModule.forRoot()
      ],
      providers: [{provide: AuthenticationService, useValue: authStub}]
    })
      .compileComponents();

    promise = new Promise((resolve, reject) => {
      resolve();
    });

    authStub = jasmine.createSpyObj('authenticationService',
      ['loginWithGoogle', 'loginWithFormData', 'signOut', 'signInWithPopup']);

    authStub.loginWithGoogle.and.returnValue(promise);
    authStub.loginWithFormData.and.returnValue(promise);
    authStub.signOut.and.returnValue(promise);
    authStub.signInWithPopup.and.returnValue(promise);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.get(AuthenticationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('showModal should be true when registerNewUser() is called', () => {
    component.showModal = false;
    expect(component.showModal).toBe(false);
    component.registerNewUser();
    expect(component.showModal).toBe(true);
    component.showModal = true;
    component.registerNewUser();
    expect(component.showModal).toBe(true);
  });

  it('showModal should be false when removeModal() is called', () => {
    component.showModal = true;
    expect(component.showModal).toBe(true);
    component.removeModal();
    expect(component.showModal).toBe(false);
    component.showModal = false;
    component.removeModal();
    expect(component.showModal).toBe(false);
  });

  it('showModal should be false when userRegistred is called', () => {
    component.showModal = true;
    expect(component.showModal).toBe(true);
    component.userRegistred({});
    expect(component.showModal).toBe(false);
    component.showModal = false;
    component.userRegistred({});
    expect(component.showModal).toBe(false);
  });

  it('should set error messages to null when resetErrors() is called', () => {
    const emailPassErrTestMsg = 'Some random string that represents the email/password error message';
    const googleLoginErrTestMsg = 'Some random string that represents the google login error message';
    component.emailPasswordError = emailPassErrTestMsg;
    component.googleloginError = googleLoginErrTestMsg;
    expect(component.emailPasswordError).toBe(emailPassErrTestMsg);
    expect(component.googleloginError).toBe(googleLoginErrTestMsg);

    component.resetErrors();
    expect(component.emailPasswordError).toBe(null);
    expect(component.googleloginError).toBe(null);

    component.emailPasswordError = null;
    component.googleloginError = null;

    component.resetErrors();
    expect(component.emailPasswordError).toBe(null);
    expect(component.googleloginError).toBe(null);
  });

  it('should route to /home when routeToHome() is called', () => {
    const router: Router = TestBed.get(Router);
    const sub = new Subject();
    promise = new Promise((resolve, reject) => {
      resolve(null);
      sub.next();
    });
    
    spyOn(router, 'navigateByUrl');
    component.routeToHome();

    const subscription = sub.subscribe(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree([`home`]),
        { skipLocationChange: false });
      subscription.unsubscribe();
    });
  });

  it('should call signInWithEmailAndPassword when loginWithFormData is called', () => {
    component.loginWithFormData();

    expect(authService.loginWithFormData).toHaveBeenCalledTimes(1);
  });

  it('should call signInWithEmailAndPassword with the data form the form when loginWithFormData', () => {
    const email = 'test@mail.com';
    const password = 'SuperSecretPassword1234';

    setInputValue('#emailInput', email);
    setInputValue('#passwordInput', password);
    fixture.detectChanges();

    component.loginWithFormData();

    expect(authService.loginWithFormData).toHaveBeenCalledWith(email, password);
  });

  it('should call route to home when login with Google is succsessful', () => {
    const afAuth = TestBed.get(AngularFireAuth);
    const sub = new Subject();
    promise = new Promise((resolve, reject) => {
      resolve(null);
      sub.next();
    });
    
    spyOn(component, 'routeToHome');
    component.loginWithGoogle();

    const subscription = sub.subscribe(() => {
      expect(component.routeToHome).toHaveBeenCalledTimes(1);
      subscription.unsubscribe();
    });
  });

  it('should not call route to home when login with google fails', () => {
    const sub = new Subject();
    promise = new Promise((resolve, reject) => {
      reject(null);
      sub.next();
    });
    
    spyOn(component, 'routeToHome');
    component.loginWithGoogle();

    const subscription = sub.subscribe(() => {
      expect(component.routeToHome).toHaveBeenCalledTimes(0);
      subscription.unsubscribe();
    });
  });

  it('should make error message when login with google fails', () => {
    const afAuth = TestBed.get(AngularFireAuth);
    const sub = new Subject();
    promise = new Promise((resolve, reject) => {
      reject({});
      sub.next();
    });

    component.loginWithGoogle();

    const subscription = sub.subscribe(() => {
      const alert = fixture.debugElement.queryAll(By.css('.red-text'));

      expect(alert.length).toBe(1);
      subscription.unsubscribe();
    });
  });

  it('should route to home when login with email and password is successful', () => {
    const afAuth = TestBed.get(AngularFireAuth);
    const sub = new Subject();
    promise = new Promise((resolve, reject) => {
      resolve(null);
      sub.next();
    });

    spyOn(component, 'routeToHome');

    component.loginWithFormData();

    const subscription = sub.subscribe(() => {
      expect(component.routeToHome).toHaveBeenCalledTimes(1);
      subscription.unsubscribe();
    });
  });

  it('should make error message when login with email and password fails and lock the user out of trying again', async () => {
    expect(component.eligibleLogin).toBe(true);

    for (let i = 0; i < 3; i++) {
      const promise = new Promise((resolve, reject) => {
        reject();
      });

      authService.loginWithFormData.and.returnValue(promise);

      await component.loginWithFormData();
    }

    fixture.detectChanges();
    const alert = fixture.debugElement.queryAll(By.css('.red-text'));
    expect(alert.length).toBe(1);
    expect(component.emailPasswordError).toBe('Email or password is invalid');
    expect(component.eligibleLogin).toBe(false);
    expect(component.failedLoginAttempts).toBe(0);
  });

  it('should lock out the user when the captcha expires and unlock when it is completed again', () => {
    expect(component.eligibleLogin).toBe(true);
    component.captchaResolved(null);
    expect(component.eligibleLogin).toBe(false);
    component.captchaResolved('Mit navn er Sten');
    expect(component.eligibleLogin).toBe(true);
  });

  it('should not be possible to attempt to login while the form login button is disabled', () => {
    component.captchaResolved(null);
    component.loginWithFormData();
    expect(component.emailPasswordError).toBe('Please check the captcha to continue');
  });

  it('should handle actions on log out',
    async () => {
      const spy = spyOn(console, 'log').and.callThrough();
      await component.signOut();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(authService.signOut).toHaveBeenCalledTimes(1);
    });

  function setInputValue(selector: string, value: string) {
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css(selector)).nativeElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }
});
