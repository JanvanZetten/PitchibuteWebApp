import {Injectable} from '@angular/core';
import {GroupServiceModule} from '../group-service.module';
import {Group} from '../../../entities/group';
import {AngularFirestore} from '@angular/fire/firestore';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../../authentication/authentication-service/authentication.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token',
  })
};

@Injectable({
  providedIn: GroupServiceModule
})

export class GroupService {

  constructor(private database: AngularFirestore, private http: HttpClient,
              private authService: AuthenticationService) {
  }

  getHttpOptions() {
    this.authService.getToken().then(token => {
      httpOptions.headers.set('Authorization', token);
    }).catch();
  }

  // Retrieve group data, and then sending HTTP request to add new user.
  async addUserToGroup(group: Group, email: string): Promise<any> {
    await this.getHttpOptions();
    return this.http.post('https://us-central1-pitchibute.cloudfunctions.net/addUserToGroup',
      {collection: 'groups', doc: group.id, email: email},
      httpOptions).toPromise();
  }
}
