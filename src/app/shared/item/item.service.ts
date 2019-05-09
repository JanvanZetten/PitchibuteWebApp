import { Injectable } from '@angular/core';
import { Item, type } from 'src/app/entities/item';
import { Group } from './../../entities/group';
import { Folder } from './../../entities/folder';
import { Event } from './../../entities/event';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private db: AngularFirestore,
    private http: HttpClient,
    private auth: AngularFireAuth) { }

  public static getChildItems(parentPath: Item[]): Observable<Item[]> {
    return null
  }

  public static getChildrenFromPathAndTree(path: Item[], tree: Item[]): Item[] {
    var children = tree
    path.forEach(i => {
      if (i.id === null || i.id === undefined || i.id === '') {
        throw new Error(`Unexpected error occured, item ${i.name} is missing id`)
      }
      const childToGo = children.find(c => c.id === i.id)
      if (childToGo.type === type.event) {
        children = (childToGo as Event).resources
      } else if (childToGo.type === type.folder) {
        children = (childToGo as Folder).resources
      } else if (childToGo.type === type.group) {
        children = (childToGo as Group).items
      } else {
        throw new Error(`Unexpected error occured, item ${i.name} can't have items`)
      }
    })
    return children
  }

  public static updateTree(oldTree: Item[], pathToWhereToUpdate: Item[], newChildren: Item[]): Item[] {
    // TODO return tree with the new children in the place of where the path goes
    return null;
  }
}
