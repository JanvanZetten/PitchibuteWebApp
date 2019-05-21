import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.scss']
})
export class RegistrerComponent implements OnInit {
  @Output() succes = new EventEmitter();
  @Output() error = new EventEmitter();

  registrerForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    comfirmPassword: new FormControl()
  })
  showPasswordNotMatchError = false;

  errorMessage: string;

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  checkPasswordMatch() {
    this.showPasswordNotMatchError =
      this.registrerForm.value.password !== this.registrerForm.value.comfirmPassword;
  }

  registrer() {
    this.errorMessage = null;
    this.checkPasswordMatch() // To tell the user if the passwords match

    // TODO Add some requirements for the password (like min. length) other then those firebase gives.

    if (this.registrerForm.value.password === this.registrerForm.value.comfirmPassword) {

      let promiseUserCredential = this.afAuth.auth.createUserWithEmailAndPassword
        (this.registrerForm.value.email, this.registrerForm.value.password)
        .then(u => this.succes.emit(u))
        .catch(reason => { this.errorMessage = reason; this.error.emit(reason) })
    }
  }
}
