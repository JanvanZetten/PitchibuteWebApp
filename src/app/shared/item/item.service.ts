import { HierachyServiceService } from './../hierachy/hierachy-service/hierachy-service.service';
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

  constructor(private hiearchyService: HierachyServiceService) { }

  public getChildItems(parentPath: Item[]): Observable<Item[]> {
    return this.hiearchyService.getChildItemsFromFirebaseFunction(parentPath)
  }

  public static getChildrenFromPathAndTree(path: Item[], tree: Item[]): Item[] {
    var children = tree
    path.forEach(i => {
      if (i.id === null || i.id === undefined || i.id === '') {
        throw new Error(`Unexpected error occured, item ${i.name} is missing id`)
      }
      const childToGo = children.find(c => c.id === i.id)
      children = this.getChildArray(childToGo)
    })
    return children
  }

  public static updateTree(oldTree: Item[], pathToWhereToUpdate: Item[], newChildren: Item[]): Item[] {
    const itemToUpdate = oldTree.find(i => i.id === pathToWhereToUpdate[0].id)
    var ref = itemToUpdate

    for (let i = 1; i < pathToWhereToUpdate.length; i++) {
      const pathItem = pathToWhereToUpdate[i]
      const children = this.getChildArray(ref)
      ref = children.find(item => item.id === pathItem.id)
    }

    //TODO Update the item to update

    return oldTree.map(i => i.id === itemToUpdate.id ? itemToUpdate : i)
  }

  private static getChildArray(parent: Item): Item[] {
    if (parent.type === type.event) {
      return (parent as Event).resources
    } else if (parent.type === type.folder) {
      return (parent as Folder).resources
    } else if (parent.type === type.group) {
      return (parent as Group).items
    } else {
      throw new Error(`Unexpected error occured, item ${i.name} can't have items`)
    }

  }
}
