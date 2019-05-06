import {ReactiveFormsModule} from '@angular/forms';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {RegistrerComponent} from '../registrer/registrer.component';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../shared/authentication/authentication-service/authentication.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authStub: any;
  let thenStub: any;
  let catchStub: any;
  let authService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, RegistrerComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [{provide: AuthenticationService, useValue: authStub}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    authStub = jasmine.createSpyObj('authenticationService',
      ['loginWithGoogle', 'loginWithFormData', 'signOut', 'signInWithPopup']);
    catchStub = jasmine.createSpyObj('Catch', ['catch']);
    thenStub = jasmine.createSpyObj('Then', ['then']);

    authStub.loginWithGoogle.and.returnValue(thenStub);
    authStub.loginWithFormData.and.returnValue(thenStub);
    authStub.signOut.and.returnValue(thenStub);
    thenStub.then.and.returnValue(catchStub);

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
    spyOn(router, 'navigateByUrl');

    component.routeToHome();

    expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree([`home`]),
      {skipLocationChange: false});
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
    spyOn(component, 'routeToHome');
    component.loginWithGoogle();

    setTimeout(() => expect(component.routeToHome).toHaveBeenCalledTimes(1), 1000);
  });

  it('should not call route to home when login with google fails', () => {
    spyOn(component, 'routeToHome');
    component.loginWithGoogle();

    expect(component.routeToHome).toHaveBeenCalledTimes(0);
  });

  it('should make error message when login with google fails', () => {
    component.loginWithGoogle();

    const alert = fixture.debugElement.queryAll(By.css('.red-text'));
    setTimeout(() =>
        expect(alert.length).toBe(1), 1000);
  });

  it('should route to home when login with email and password is successful', () => {
    spyOn(component, 'routeToHome');
    component.loginWithFormData();

    setTimeout(() => expect(component.routeToHome).toHaveBeenCalledTimes(1), 1000);
  });

  it('should make error message when login with email and password fails', () => {
    component.loginWithFormData();

    setTimeout(() => {
        const alert = fixture.debugElement.queryAll(By.css('.red-text'));
        expect(alert.length).toBe(1);
        expect(component.emailPasswordError).toBe('Email or password is invalid');
      }, 1000);
  });

  function setInputValue(selector: string, value: string) {
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css(selector)).nativeElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }
});
