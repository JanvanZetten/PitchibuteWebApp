import { Injectable } from '@angular/core';
import { Item } from 'src/app/entities/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  public static getChildItems(parentPath: Item[]): Item[]{

    return null
  }
}
