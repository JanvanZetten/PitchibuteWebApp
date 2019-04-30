import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Item} from '../../../Entities/item';

@Injectable({
  providedIn: 'root'
})
export class HierachyServiceService {

  constructor(private db: AngularFirestore) { }

  displayGroups(): Observable<any> {
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
  }
}
