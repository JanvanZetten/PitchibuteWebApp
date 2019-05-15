import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HierachyServiceModule } from './hierachy-service.module';
import { Item } from 'src/app/entities/item';

@Injectable({
  providedIn: HierachyServiceModule
})
export class HierachyServiceService {

  uid: string;

  constructor(private http: HttpClient) { }

  getChildItemsFromFirebaseFunction(path: Item[]): Observable<Item[]> {
    const headers = {
      headers: new HttpHeaders({
        'uid': 'keyString',
        'path': this.generateStoreUri(path),
        'authorization': 'random'
      })
    };
    return this.http.get('https://us-central1-pitchibute.cloudfunctions.net/getPathItems', headers) as Observable<Item[]>;
  }

  generateStoreUri(path: Item[]): string {
    const itemsUriPart = '/items'
    let currentPathString = itemsUriPart;
    path.forEach(arrayItem => {
      currentPathString = currentPathString + '/' + arrayItem.id + itemsUriPart;
    });
    return currentPathString;
  }
}
