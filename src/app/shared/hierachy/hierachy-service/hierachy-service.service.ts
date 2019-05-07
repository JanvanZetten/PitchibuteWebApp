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

  // THIS CLASS IS A MESS

  displayItems(path: string): Observable<any> {
    /*this.currentUserUID.subscribe(next => {if (next) {

      const headers = {
        headers: new HttpHeaders({
          'uid': next,
          'path': path,
          'authorization': 'random'
        })
      };
      this.http.get<Item[]>('https://us-central1-pitchibute.cloudfunctions.net/getPathItems', headers).subscribe(
        next2 => { this.groupsObservable.next(next2); },
        err => { this.groupsObservable.error('No user is logged in 2'); });
    } else {
      this.groupsObservable.error('No user is logged in 3');
    }}, err => {this.groupsObservable.error('No user is logged in 4'); });
    return this.groupsObservable;*/

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
