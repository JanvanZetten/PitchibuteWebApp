import {Injectable} from '@angular/core';
import {GroupServiceModule} from '../group-service.module';
import {Group} from '../../../entities/group';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../../authentication/authentication-service/authentication.service';


@Injectable({
  providedIn: GroupServiceModule
})

export class GroupService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
    })
  };

  constructor(private http: HttpClient,
              private authService: AuthenticationService) {
  }

  getHttpOptions() {
    this.authService.getToken().then(token => {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + token);
    });
  }

  // Retrieve group data, and then sending HTTP request to add new user.
  async addUserToGroup(group: Group, email: string): Promise<any> {
    await this.getHttpOptions();
    return this.http.post('http://localhost:5000/pitchibute/us-central1/addUserToGroup',
      {collection: 'groups', doc: group.id, email: email},
      this.httpOptions).toPromise();
  }
}
