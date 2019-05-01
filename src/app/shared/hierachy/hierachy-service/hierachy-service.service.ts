import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {AngularFireAuth} from '@angular/fire/auth';
import {HierachyServiceModule} from './hierachy-service.module';
import {map} from 'rxjs/operators';
import {Item} from '../../../Entities/item';

@Injectable({
  providedIn: HierachyServiceModule
})
export class HierachyServiceService {

  constructor(private db: AngularFirestore,
              private http: HttpClient,
              private auth: AngularFireAuth) { }

  displayGroups(): Observable<any> {

    const headers = {
      headers: new HttpHeaders({
        'uid': this.auth.auth.currentUser.uid,
        'path': 'groups'
      })
    };
    return this.http.get('https://us-central1-pitchibute.cloudfunctions.net/getMainGroups)', headers);

    /*
    return this.db.collection('groups').snapshotChanges()
      .pipe(map(actions => {
          // actions is an array of DocumentChangeAction
          return actions.map(action => {
            const data = action.payload.doc.data() as Item;
            return {
              id: action.payload.doc.id,
              name: data.name,
              type: data.type
            };
          });
        })
      );
      */
  }
}
