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

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  loginWithGoogle() {
    let userPromise = this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    // TODO wait for promise and if succesful redirect to the users site
  }

  loginWithFormData() {
    let userPromise = this.afAuth.auth.signInWithEmailAndPassword(
      this.loginForm.value.email, this.loginForm.value.password);
    // TODO wait for promise and if succesful redirect to the users site
  }

  registerNewUser() {
    this.showModal = true;
  }

  removeModal() {
    this.showModal = false;
  }
}
