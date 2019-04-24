import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.scss']
})
export class RegistrerComponent implements OnInit {
  registrerForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    comfirmPassword: new FormControl()
  })

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  registrer() {
    if (this.registrerForm.value.password === this.registrerForm.value.comfirmPassword) {
      let promiseUserCredential = this.afAuth.auth.createUserWithEmailAndPassword(this.registrerForm.value.email, this.registrerForm.value.password)
      // TODO Act on what the promise returns.
    }
    // TODO If the passwords where not equal then tell the user.
    // TODO Add some requirements for the passwords like min. length.
  }
}
