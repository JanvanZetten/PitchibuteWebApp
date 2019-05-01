import {Injectable} from '@angular/core';
import {GroupServiceModule} from '../group-service.module';
import {Group} from '../../../Entities/group';
import {AngularFirestore} from '@angular/fire/firestore';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: GroupServiceModule
})

export class GroupService {

  constructor(private database: AngularFirestore, private http: HttpClient) {
  }

  // Retrieve group data, and then sending HTTP request to add new user.
  addUserToGroup(group: Group, email: string): Observable<any> {
    let users = [];
    return this.database.collection('groups').doc(group.id).get()
      .pipe(switchMap(doc => {
      users = doc.data().users;
      return this.http.post('https://us-central1-pitchibute.cloudfunctions.net/addUserToGroup',
        {collection: 'groups', doc: group.id, email: email, users: users},
        httpOptions);
    }));



  }
}
