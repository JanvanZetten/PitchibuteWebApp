import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../shared/authentication/authentication-service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  showModal = false;
  eligibleLogin = true;

  emailPasswordError: string;
  googleloginError: string;
  failedLoginAttempts = 0;

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
  }

  captchaResolved(captchaResponse: string) {
    if (captchaResponse) {
      this.eligibleLogin = true;
    } else {
      this.eligibleLogin = false;
    }
  }

  loginWithGoogle() {
    this.resetErrors();
    this.authService.loginWithGoogle()
      .then(() => this.routeToHome())
      .catch(reason => this.googleloginError = 'Did not login with Google');
  }

  loginWithFormData() {
    if (this.eligibleLogin) {
      this.resetErrors();
      this.authService.loginWithFormData(
        this.loginForm.value.email, this.loginForm.value.password)
        .then(UserCred => {
          this.routeToHome()
        }, reason => {
          this.emailPasswordError = 'Email or password is invalid';
          this.failedLoginAttempts++;
          if (this.failedLoginAttempts === 3) {
            this.eligibleLogin = false;
            this.failedLoginAttempts = 0;
          }
        });
    } else {
      this.emailPasswordError = 'Please check the captcha to continue';
    }
  }

  registerNewUser() {
    this.showModal = true;
  }

  removeModal() {
    this.showModal = false;
  }

  userRegistred(user) {
    this.removeModal();
  }

  resetErrors() {
    this.emailPasswordError = null;
    this.googleloginError = null;
  }

  routeToHome() {
    this.router.navigate(['home']);
  }

  // This works, news a button with design tho.
  signOut() {
    this.authService.signOut().then(() => {
      console.log('You have been logged out');
    });
  }
}
