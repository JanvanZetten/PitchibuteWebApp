import { AuthenticationService } from './shared/authentication/authentication-service/authentication.service';
import { TestBed, async, fakeAsync, tick, flush } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { of, Subject } from 'rxjs';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  let mockAuth: MockAuthenticationService;
  let authService: AuthenticationService;

  beforeEach(async(() => {
    mockAuth = new MockAuthenticationService();
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'welcome', component: AppComponent }
        ]),
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      declarations: [
        AppComponent
      ],
      providers: [{ provide: AuthenticationService, useValue: mockAuth }]
    }).compileComponents();
  }));

  beforeEach(() => {
    authService = TestBed.get(AuthenticationService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'PitchibuteWebApp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('PitchibuteWebApp');
  });

  it('should call the authService signout', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(authService, 'signOut').and.returnValue(of({}).toPromise())
    app.logout()
    expect(authService.signOut).toHaveBeenCalled()
  })

  it('should navigate to the root/login site', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    const router: Router = TestBed.get(Router);
    const spy = spyOn(router, 'navigateByUrl').and.callThrough();

    app.logout()
    flush();
    
    expect(spy).toHaveBeenCalledWith('/welcome');
  }))
});

class MockAuthenticationService {
  promise = new Promise((resolve, reject) => {
    resolve();
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
}
