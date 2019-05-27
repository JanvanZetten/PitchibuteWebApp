import { TestBed, async } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardService],
      imports: [
        RouterTestingModule.withRoutes([]),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule
      ]
    })
      .compileComponents();
  }));

  it('should be created', () => {
    const service: AuthGuardService = TestBed.get(AuthGuardService)
    expect(service).toBeTruthy()
  });

  it('should return true if logged in ', async () => {
    const user = getAllNullUser()
    const fireAuthMock = jasmine.createSpyObj('AngularFireAuth', ['authState'])
    fireAuthMock.authState = of(user)
    const service = new AuthGuardService(fireAuthMock, TestBed.get(Router))

    const result = await service.canActivate(null, null)

    expect(result).toBe(true)
  })

  it('should return false when not logged in', async () => {
    const fireAuthMock = jasmine.createSpyObj('AngularFireAuth', ['authState'])
    fireAuthMock.authState = of(null)
    const service = new AuthGuardService(fireAuthMock, TestBed.get(Router))

    const result = await service.canActivate(null, null)

    expect(result).toBe(false)
  })

  it('should go to path /welcome when not logged in', async () => {
    const fireAuthMock = jasmine.createSpyObj('AngularFireAuth', ['authState'])
    fireAuthMock.authState = of(null)
    const router: Router = TestBed.get(Router);
    spyOn(router, 'navigate');
    const service = new AuthGuardService(fireAuthMock, router)

    const result = await service.canActivate(null, null)

    expect(router.navigate).
      toHaveBeenCalledWith(['welcome']);
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
      updatePassword: null, updatePhoneNumber: null, updateProfile: null, displayName: "TestName",
      email: "Email@mail.com", photoURL: null, providerId: null, uid: null
    }
  }
});
