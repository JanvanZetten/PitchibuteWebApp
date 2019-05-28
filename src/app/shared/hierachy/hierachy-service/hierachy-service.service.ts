import { AuthenticationService } from './../../authentication/authentication-service/authentication.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HierachyServiceModule } from './hierachy-service.module';
import { Item } from 'src/app/entities/item';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: HierachyServiceModule
})
export class HierachyServiceService {
  private readonly FUNCTIONS_URL = "https://us-central1-pitchibute.cloudfunctions.net/"
  private readonly GET_PATH_FUNCTION_URL = this.FUNCTIONS_URL + "getPathItems"
  private readonly ADD_ITEM_FUNCTION_URL = this.FUNCTIONS_URL + "addItem"
  uid: string;

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getChildItemsFromFirebaseFunction(path: Item[]): Observable<Item[]> {
    const headers = {
      headers: new HttpHeaders({
        'uid': 'keyString',
        'path': this.generateStoreUri(path),
        'authorization': 'random'
      })
    };
    return this.http.get(this.GET_PATH_FUNCTION_URL, headers) as Observable<Item[]>;
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
