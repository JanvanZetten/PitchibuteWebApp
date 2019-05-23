import { AuthenticationService } from './../../authentication/authentication-service/authentication.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HierachyServiceModule } from './hierachy-service.module';
import { Item } from 'src/app/entities/item';
import { map, tap } from 'rxjs/operators';
import {promise} from 'selenium-webdriver';

@Injectable({
  providedIn: HierachyServiceModule
})
export class HierachyServiceService {
  private readonly FUNCTIONS_URL = "https://us-central1-pitchibute.cloudfunctions.net/"
  private readonly GET_PATH_FUNCTION_URL = this.FUNCTIONS_URL + "getPathItems"
  private readonly ADD_ITEM_FUNCTION_URL = this.FUNCTIONS_URL + "addItem"

  httpOptions = {
    headers: new HttpHeaders({
      'path': '',
      'authorization': 'my-auth-token',
    })
  };

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  async getChildItemsFromFirebaseFunction(path: Item[]): Observable<Item[]> {
    await this.getHttpOptions();
    console.log(this.httpOptions.headers);
    this.httpOptions.headers = this.httpOptions.headers.set('path', this.generateStoreUri(path));
    return this.http.get(this.GET_PATH_FUNCTION_URL, this.httpOptions) as Observable<Item[]>;
  }

  getHttpOptions() {
    this.authService.getToken().then(token => {
      console.log(token);
      this.httpOptions.headers = this.httpOptions.headers.set('authorization', 'Bearer ' + token);
    });
  }

  generateStoreUri(path: Item[]): string {
    const itemsUriPart = '/items'
    let currentPathString = itemsUriPart;
    path.forEach(arrayItem => {
      currentPathString = currentPathString + '/' + arrayItem.id + itemsUriPart;
    });
    return currentPathString;
  }

  async addItem(path: Item[], newItem: Item): Promise<string> {
    const token = await this.authService.getToken()

    const options = {
      headers: new HttpHeaders({
        'authorization': 'bearer ' + token
      })
    }
    return this.http.post(this.ADD_ITEM_FUNCTION_URL, { path: path, newItem: newItem }, options)
      .pipe(
        map(o => { return (o as ObjectWithId).id })
      )
      .toPromise()
  }

}

class ObjectWithId extends Object {
  id: string
}
