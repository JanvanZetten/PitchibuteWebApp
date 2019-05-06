import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { LoginComponent } from '../login/login.component';
import { RegistrerComponent } from '../registrer/registrer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import {AuthenticationService} from '../../shared/authentication/authentication-service/authentication.service';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let authStub: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeComponent, LoginComponent, RegistrerComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [{provide: AuthenticationService, useValue: authStub}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    authStub = jasmine.createSpyObj('authenticationService',
      ['loginWithGoogle', 'loginWithFormData', 'signOut', 'signInWithPopup']);
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
