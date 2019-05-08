import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {AngularFireAuth} from '@angular/fire/auth';
import {HierachyServiceModule} from './hierachy-service.module';

@Injectable({
  providedIn: HierachyServiceModule
})
export class HierachyServiceService {

  uid: string;

  constructor(private db: AngularFirestore,
              private http: HttpClient,
              private auth: AngularFireAuth) { }

  displayItems(path: string): Observable<any> {
    const self = this;

    // This cannot get the UID needed in the header below.
    this.auth.auth.onAuthStateChanged(function(user) {
      if (user) {
        self.uid = user.uid;
      } else {
        console.log('No user is logged in 1');
      }
    });

    const headers = {
      headers: new HttpHeaders({
        'uid': 'keyString',
        'path': path,
        'authorization': 'random'
      })
    };
    return this.http.get('https://us-central1-pitchibute.cloudfunctions.net/getPathItems', headers);
  }
}
