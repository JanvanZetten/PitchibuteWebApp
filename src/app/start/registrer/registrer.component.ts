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

  constructor() { }

  ngOnInit() {
  }

  registrer() {
    // TODO Registrer the user form the form
  }

}
