import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../shared/authentication/authentication-service/authentication.service';
import index from '@angular/cli/lib/cli';

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

  emailPasswordError: string;
  googleloginError: string;

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  loginWithGoogle() {
    this.resetErrors();
    this.authService.loginWithGoogle()
      .then(() => this.routeToHome())
      .catch(reason => this.googleloginError = 'Did not login with Google');
  }

  loginWithFormData() {
    this.resetErrors();
    this.authService.loginWithFormData(
      this.loginForm.value.email, this.loginForm.value.password)
      .then(UserCred => this.routeToHome())
      .catch(reason => this.emailPasswordError = 'Email or password is invalid');
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
    }).catch();
  }
}
