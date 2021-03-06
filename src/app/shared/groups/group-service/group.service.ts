import {Injectable} from '@angular/core';
import {GroupServiceModule} from '../group-service.module';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../../authentication/authentication-service/authentication.service';
import {Item} from '../../../entities/item';
import {Store} from '@ngxs/store';
import {ItemState} from 'src/app/store/state/item.state';
import { FetchItems } from 'src/app/store/actions/item.action';


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
      this.path = p;
    });
  }

  getHttpOptions() {
    this.authService.getToken().then(token => {
      this.httpOptions.headers = this.httpOptions.headers.set('authorization', 'Bearer ' + token);
    });
  }

  getPathCollection() {
    let collection = '';
    this.path.forEach(itemP => {
      collection += 'items/' + itemP.id + '/';
    });
    collection += 'items/';
    return collection;
  }

  async renameItem(item: Item, newName: string): Promise<any> {
    await this.getHttpOptions();
    const collection = this.getPathCollection();
    return this.http.post('https://us-central1-pitchibute.cloudfunctions.net/renameItem',
      {collection: collection, doc: item.id, name: newName}, {headers: this.httpOptions.headers, responseType: 'text'}).toPromise();
  }

  // Retrieve group data, and then sending HTTP request to add new user.
  async addUserToGroup(item: Item, email: string): Promise<any> {
    await this.getHttpOptions();
    return this.http.post('https://us-central1-pitchibute.cloudfunctions.net/addUserToGroup',
      {collection: 'items', doc: item.id, email: email},
      {headers: this.httpOptions.headers, responseType: 'text'}).toPromise();
  }

  async deleteItem(item: Item): Promise<any> {
    await this.getHttpOptions();
    const collection = this.getPathCollection();
    return this.http.post('https://us-central1-pitchibute.cloudfunctions.net/deleteItem', {
      collection: collection,
      doc: item.id
    }, {headers: this.httpOptions.headers, responseType: 'text'}).toPromise();
  }

  fetchItems() {
    this.store.dispatch(new FetchItems());
  }
}
