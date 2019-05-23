import { AuthenticationServiceModule } from './shared/authentication/authentication-service.module';
import { AuthenticationService } from './shared/authentication/authentication-service/authentication.service';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { of, Subject } from 'rxjs';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AuthenticationServiceModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

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
    const authService = TestBed.get(AuthenticationService)
    spyOn(authService, 'signOut').and.returnValue(of({}).toPromise())
    app.logout()
    expect(authService.signOut).toHaveBeenCalled()
  })

  it('should navigate to the root/login site', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const authService = TestBed.get(AuthenticationService)
    const sub = new Subject()
    const promise = new Promise((resolve, reject) => {
      resolve(null);
      sub.next();
    });
    spyOn(authService, 'signOut').and.returnValue(promise)
    const router: Router = TestBed.get(Router);
    spyOn(router, 'navigateByUrl');
    app.logout()
    const subscription = sub.subscribe(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree(["/"]),
        { skipLocationChange: false });
      subscription.unsubscribe();
    });
  })
});
