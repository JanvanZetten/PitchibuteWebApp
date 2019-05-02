import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

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

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  loginWithGoogle() {
    this.resetErrors()
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(() => this.routeToHome())
      .catch(reason => this.googleloginError = "Did not login with Google")
  }

  loginWithFormData() {
    this.resetErrors()
    this.afAuth.auth.signInWithEmailAndPassword(
      this.loginForm.value.email, this.loginForm.value.password)
      .then(UserCred => this.routeToHome())
      .catch(reason => this.emailPasswordError = "Email or password is invalid")
  }

  registerNewUser() {
    this.showModal = true
  }

  removeModal() {
    this.showModal = false
  }

  userRegistred(user) {
    this.removeModal()
  }

  resetErrors() {
    this.emailPasswordError = null
    this.googleloginError = null
  }

  routeToHome() {
    this.router.navigate(['home'])
  }
}
