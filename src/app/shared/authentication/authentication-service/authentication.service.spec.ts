import {TestBed} from '@angular/core/testing';

import {AuthenticationService} from './authentication.service';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../../environments/environment';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [AuthenticationService],
    });
    service = TestBed.get(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call signInWithEmailAndPassword when loginWithFormData is called', () => {
    const afAuth = TestBed.get(AngularFireAuth);

    spyOn(afAuth.auth, 'signInWithEmailAndPassword').and.returnValue(Promise.resolve(null));

    service.loginWithFormData('123', '123');

    expect(afAuth.auth.signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });

  it('should call signInWithEmailAndPassword with the data form the form when loginWithFormData', () => {
    const afAuth = TestBed.get(AngularFireAuth);

    const promise = new Promise((resolve, reject) => {
    });

    spyOn(afAuth.auth, 'signInWithEmailAndPassword').and.returnValue(promise);
    const email = 'test@mail.com';
    const password = 'SuperSecretPassword1234';

    service.loginWithFormData(email, password);

    expect(afAuth.auth.signInWithEmailAndPassword).toHaveBeenCalledWith(email, password);
  });

  it('should call signInWithPopup when loginWithGoogle() is called', () => {
    const afAuth = TestBed.get(AngularFireAuth);

    const promise = new Promise((resolve, reject) => {
    });

    spyOn(afAuth.auth, 'signInWithPopup').and.returnValue(promise);

    service.loginWithGoogle();

    expect(afAuth.auth.signInWithPopup).toHaveBeenCalledTimes(1);
  });

});

