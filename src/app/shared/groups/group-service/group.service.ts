import {Injectable} from '@angular/core';
import {GroupServiceModule} from '../group-service.module';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../../authentication/authentication-service/authentication.service';
import { Item } from '../../../entities/item';
import { Store } from '@ngxs/store';
import { ItemState } from 'src/app/store/state/item.state';



@Injectable({
  providedIn: GroupServiceModule
})

export class GroupService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'my-auth-token',
    })
  };

  path: Item[];

  constructor(private http: HttpClient,
    private authService: AuthenticationService,
    private store: Store) {
    this.store.select(ItemState.getPath).subscribe(p => {
      this.path = p
    });
  }

  getHttpOptions() {
    this.authService.getToken().then(token => {
      this.httpOptions.headers = this.httpOptions.headers.set('authorization', 'Bearer ' + token);
    });
  }

  async renameItem(collection: string, doc: string, newName: string): Promise<any> {
    if (!collection) {
      collection = '';
      this.path.forEach(item => {
        collection += 'items/' + item.id + '/';
      });
      collection += 'items/';
    }

    await this.getHttpOptions();
    return this.http.post('https://us-central1-pitchibute.cloudfunctions.net/renameItem',
      {collection: collection, doc: doc, name: newName}, this.httpOptions).toPromise();
  }

  // Retrieve group data, and then sending HTTP request to add new user.
  async addUserToGroup(item: Item, email: string): Promise<any> {
    await this.getHttpOptions();
    return this.http.post('https://us-central1-pitchibute.cloudfunctions.net/addUserToGroup',
      {collection: 'items', doc: item.id, email: email},
      this.httpOptions).toPromise();
  }
}
