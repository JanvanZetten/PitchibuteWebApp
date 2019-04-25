import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  showModal = false;

  emailPasswordError: string
  googleloginError: string

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  loginWithGoogle() {
    this.resetErrors()
    let userPromise = this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(UserCred => /* Redirect to the users main site */ { })
      .catch(reason => this.googleloginError = "Did not login with Google")
  }

  loginWithFormData() {
    this.resetErrors()
    let userPromise = this.afAuth.auth.signInWithEmailAndPassword(
      this.loginForm.value.email, this.loginForm.value.password)
      .then(UserCred => /* Redirect to the users main site */ { })
      .catch(reason => this.emailPasswordError = "Email or password is invalid")
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
}
