import {Injectable} from '@angular/core';
import {auth} from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import UserCredential = firebase.auth.UserCredential;
import {AuthenticationServiceModule} from '../authentication-service.module';

@Injectable({
  providedIn: AuthenticationServiceModule
})
export class AuthenticationService {

  constructor(private afAuth: AngularFireAuth) {
  }

  // Returns a promise for signing out.
  signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  // Google.
  loginWithGoogle(): Promise<UserCredential> {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  getToken(): Promise<string> {
    return this.afAuth.auth.currentUser.getIdToken();
  }

  // Email & Password.
  loginWithFormData(email: string, password: string): Promise<UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(
      email, password);
  }

}
