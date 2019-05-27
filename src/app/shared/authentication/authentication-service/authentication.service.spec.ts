import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../../environments/environment';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let angularFireAuth: AngularFireAuth;

  beforeEach(() => {
    {
      TestBed.configureTestingModule({
        imports: [
          AngularFireAuthModule,
          AngularFireModule.initializeApp(environment.firebase)
        ],
        providers: [AuthenticationService, { provide: AngularFireAuth, useValue: new mockAngularFireAuth()}]
      });

      angularFireAuth = TestBed.get(AngularFireAuth);

      service = TestBed.get(AuthenticationService);
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call log out btn', () => {
    const spy = spyOn(angularFireAuth.auth, 'signOut').and.callThrough();

    service.signOut();

    expect(spy).toHaveBeenCalled()
  });

  it('should call signInWithEmailAndPassword when loginWithFormData is called', () => {
    const spy = spyOn(angularFireAuth.auth, 'signInWithEmailAndPassword').and.callThrough();

    service.loginWithFormData('123', '123');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call signInWithEmailAndPassword with the data form the form when loginWithFormData', () => {
    const email = 'test@mail.com';
    const password = 'SuperSecretPassword1234';

    const spy = spyOn(angularFireAuth.auth, 'signInWithEmailAndPassword').and.callThrough();

    service.loginWithFormData(email, password);

    expect(spy).toHaveBeenCalledWith(email, password);
  });

  it('should return token from Firebase Authentication',
    () => {
      const spy = spyOn(angularFireAuth.auth.currentUser, 'getIdToken').and.callThrough();

      service.getToken();

      expect(spy).toHaveBeenCalledTimes(1);
    });

  it('should call signInWithPopup when loginWithGoogle() is called', () => {
    const spy = spyOn(angularFireAuth.auth, 'signInWithPopup').and.callThrough();

    service.loginWithGoogle();

    expect(spy).toHaveBeenCalledTimes(1);
  });

});

class mockAngularFireAuth {
  auth = new mockFirebaseAuth();
}

class mockFirebaseAuth {
  currentUser = new mockUser();

  signOut() {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  signInWithPopup() {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  signInWithEmailAndPassword() {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}

class mockUser {
  getIdToken(): string {
    return 'testToken';
  }
}
