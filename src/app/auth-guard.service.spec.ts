
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { TestBed, async } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardService],
      imports: [
        RouterTestingModule.withRoutes([]),
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase)
      ]
    })
      .compileComponents();
  }));

  it('should be created', () => {
    const service: AuthGuardService = TestBed.get(AuthGuardService)
    expect(service).toBeTruthy()
  });

  it('should return true if logged in ', async () => {
    const user: firebase.User = getAllNullUser()
    const fireAuth = TestBed.get(AngularFireAuth)
    const service = TestBed.get(AuthGuardService)

    spyOn(fireAuth, 'authState').and.returnValue(of(user))

    const result = await service.canActivate(null, null)

    expect(result).toBe(true)
  })

  it('should return false when not logged in', async() => {
    const user: firebase.User = null
    const fireAuth = TestBed.get(AngularFireAuth)
    const service = TestBed.get(AuthGuardService)

    spyOn(fireAuth, 'authState').and.returnValue(of(user))

    const result = await service.canActivate(null, null)

    expect(result).toBe(false)
  })

  it('should go to path / when not logged in', () => {

  })

  function getAllNullUser(): firebase.User {
    return {
      delete: null, emailVerified: null, getIdTokenResult: null, getIdToken: null,
      isAnonymous: null, linkAndRetrieveDataWithCredential: null, linkWithCredential: null,
      linkWithPhoneNumber: null, linkWithPopup: null, linkWithRedirect: null, metadata: null,
      phoneNumber: null, providerData: null, reauthenticateAndRetrieveDataWithCredential: null,
      reauthenticateWithCredential: null, reauthenticateWithPhoneNumber: null,
      reauthenticateWithPopup: null, reauthenticateWithRedirect: null, refreshToken: null,
      reload: null, sendEmailVerification: null, toJSON: null, unlink: null, updateEmail: null,
      updatePassword: null, updatePhoneNumber: null, updateProfile: null, displayName: null,
      email: null, photoURL: null, providerId: null, uid: null
    }
  }
});
