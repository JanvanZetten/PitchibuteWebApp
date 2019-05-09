import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { HierachyServiceModule } from './hierachy-service.module';
import { Item } from 'src/app/entities/item';

@Injectable({
  providedIn: HierachyServiceModule
})
export class HierachyServiceService {

  uid: string;

  constructor(private db: AngularFirestore,
    private http: HttpClient,
    private auth: AngularFireAuth) { }

  public getChildItemsFromFirebaseFunction(path: Item[]): Observable<Item[]> {
    /* Some stuff that is not used but it was here, TODO ask Alex about this
    const self = this;
    // This cannot get the UID needed in the header below.
    this.auth.auth.onAuthStateChanged(function (user) {
      if (user) {
        self.uid = user.uid;
      } else {
        console.log('No user is logged in 1');
      }
    });
    */

    const headers = {
      headers: new HttpHeaders({
        'uid': 'keyString',
        'path': this.generateStoreUri(path),
        'authorization': 'random'
      })
    };
    return this.http.get('https://us-central1-pitchibute.cloudfunctions.net/getPathItems', headers) as Observable<Item[]>;
  }

  private generateStoreUri(path: Item[]): string {
    const itemsUriPart = '/items'
    let currentPathString = itemsUriPart;
    path.forEach(arrayItem => {
      currentPathString = currentPathString + '/' + arrayItem.id + '/items';
    });
    return currentPathString;
  }
}
