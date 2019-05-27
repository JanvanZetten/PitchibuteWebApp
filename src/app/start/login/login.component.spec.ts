import {ReactiveFormsModule} from '@angular/forms';
import { async, ComponentFixture, TestBed, fakeAsync, tick, flushMicrotasks} from '@angular/core/testing';

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
import { RecaptchaModule } from 'ng-recaptcha';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuth: MockAuthenticationService;
  let authService: AuthenticationService;

  let promiseSubject = new Subject();

  beforeEach(async(() => {
    mockAuth = new MockAuthenticationService();
    TestBed.configureTestingModule({
      declarations: [LoginComponent, RegistrerComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: LoginComponent }
        ]),
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
        RecaptchaModule.forRoot()
      ],
      providers: [{ provide: AuthenticationService, useValue: mockAuth}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authService = TestBed.get(AuthenticationService);
    promiseSubject = mockAuth.getSubject();
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

  it('should route to /home when routeToHome() is called', fakeAsync(() => {
    const router: Router = TestBed.get(Router);
    
    spyOn(router, 'navigateByUrl');
    component.routeToHome();

    tick(50);

    const subscription = promiseSubject.subscribe(() => {
      expect(router.navigate).toHaveBeenCalledWith(router.createUrlTree(['home']),
        { skipLocationChange: false });
      subscription.unsubscribe();
    });

    tick(50);
    flushMicrotasks();
  }));

  it('should call signInWithEmailAndPassword when loginWithFormData is called', fakeAsync(() => {
    const spy = spyOn(mockAuth, 'loginWithFormData').and.callThrough();

    component.loginWithFormData();

    tick(50);

    expect(authService.loginWithFormData).toHaveBeenCalledTimes(1);

    flushMicrotasks();
  }));

  it('should call signInWithEmailAndPassword with the data form the form when loginWithFormData', fakeAsync(() => {
    const spy = spyOn(authService, 'loginWithFormData').and.callThrough();

    const email = 'test@mail.com';
    const password = 'SuperSecretPassword1234';

    setInputValue('#emailInput', email);
    setInputValue('#passwordInput', password);
    fixture.detectChanges();

    component.loginWithFormData();

    tick(50);

    expect(authService.loginWithFormData).toHaveBeenCalledWith(email, password);

    flushMicrotasks();
  }));
  
  it('should call route to home when login with Google is succsessful', fakeAsync(() => {
    spyOn(component, 'routeToHome');
    component.loginWithGoogle();

    tick(50);

    const subscription = promiseSubject.subscribe(() => {
      expect(component.routeToHome).toHaveBeenCalledTimes(1);
      subscription.unsubscribe();
    });

    flushMicrotasks();
  }));
  
  it('should not call route to home when login with google fails', fakeAsync(() => {
    const spy = spyOn(mockAuth, 'loginWithGoogle').and.returnValue(new Promise((resolve, reject) => {
      reject();
      promiseSubject.next();
    }));
    
    spyOn(component, 'routeToHome');
    component.loginWithGoogle();

    tick(50);

    const subscription = promiseSubject.subscribe(() => {
      expect(component.routeToHome).toHaveBeenCalledTimes(0);
      subscription.unsubscribe();
    });

    flushMicrotasks();
  }));

  it('should make error message when login with google fails', fakeAsync(() => {
    const spy = spyOn(mockAuth, 'loginWithGoogle').and.returnValue(new Promise((resolve, reject) => {
      reject();
      promiseSubject.next();
    }));

    component.loginWithGoogle();

    tick(50);

    const subscription = promiseSubject.subscribe(() => {
      const alert = fixture.debugElement.queryAll(By.css('.red-text'));

      expect(alert.length).toBe(1);
      subscription.unsubscribe();
    });

    tick(50);
    flushMicrotasks();
  }));

  it('should route to home when login with email and password is successful', fakeAsync(() => {
    spyOn(component, 'routeToHome');

    component.loginWithFormData();

    const subscription = promiseSubject.subscribe(() => {
      expect(component.routeToHome).toHaveBeenCalledTimes(1);
      subscription.unsubscribe();
    });

    tick(50);
    flushMicrotasks();
  }));

  it('should make error message when login with email and password fails and lock the user out of trying again', fakeAsync(() => {
    const spy = spyOn(mockAuth, 'loginWithFormData').and.returnValue(new Promise((resolve, reject) => {
      reject();
    }));
    expect(component.eligibleLogin).toBe(true);

    for (let i = 0; i < 3; i++) {
      component.loginWithFormData();

      tick(50);
    }

    fixture.detectChanges();

    const alert = fixture.debugElement.queryAll(By.css('.red-text'));
    expect(alert.length).toBe(1);
    expect(component.emailPasswordError).toBe('Email or password is invalid');
    expect(component.eligibleLogin).toBe(false);
    expect(component.failedLoginAttempts).toBe(0);
    flushMicrotasks();
  }));

  it('should lock out the user when the captcha expires and unlock when it is completed again', () => {
    expect(component.eligibleLogin).toBe(true);
    component.captchaResolved(null);
    expect(component.eligibleLogin).toBe(false);
    component.captchaResolved('Mit navn er Sten');
    expect(component.eligibleLogin).toBe(true);
  });

  it('should not be possible to attempt to login while the form login button is disabled', fakeAsync(() => {
    component.captchaResolved(null);
    component.loginWithFormData();
    tick(50);
    expect(component.emailPasswordError).toBe('Please check the captcha to continue');
    flushMicrotasks();
  }));

  it('should handle actions on log out',
    fakeAsync(() => {
      const spy2 = spyOn(authService, 'signOut').and.callThrough();
      const spy = spyOn(console, 'log').and.callThrough();
      component.signOut();
      tick(50);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(1);
      flushMicrotasks();
    }));

  function setInputValue(selector: string, value: string) {
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css(selector)).nativeElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }
});

class MockAuthenticationService {
  promiseSubject = new Subject();
  promise = new Promise((resolve, reject) => {
    resolve();
    this.promiseSubject.next();
  });

  loginWithGoogle() {
    return this.promise;
  }

  loginWithFormData() {
    return this.promise;
  }

  signOut() {
    return this.promise;
  }

  getSubject() {
    return this.promiseSubject;
  }
}
