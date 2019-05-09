import {Component, OnInit} from '@angular/core';
import { Item, type } from 'src/app/entities/item';
import {HierachyServiceService} from '../hierachy-service/hierachy-service.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-hierachy',
  templateUrl: './hierachy.component.html',
  styleUrls: ['./hierachy.component.scss']
})
export class HierachyComponent implements OnInit {

  items: Observable<Item[]>;
  staticMainPath = '/items';
  currentPathItems: Item[] = [];

  constructor(private service: HierachyServiceService) { }

  ngOnInit() {
    this.items = this.service.displayItems(this.staticMainPath);
  }

  clickPath(item: Item) {
    if (item.type === type.group || item.type === type.event || item.type === type.folder) {
      this.currentPathItems.push(item);
      this.items = this.service.displayItems(this.generateHttpURL());
    } else if (item.type === type.file || item.type === type.link) { // ADD SOMETHING HERE
      }
  }

  clickBack() {
    this.currentPathItems.pop();
    this.items = this.service.displayItems(this.generateHttpURL());
  }

  clickReturnToHome() {
    this.currentPathItems = [];
    this.items = this.service.displayItems(this.generateHttpURL());
  }

  generateHttpURL(): string {
    let currentPathString = this.staticMainPath;
    this.currentPathItems.forEach( arrayItem => {
      currentPathString = currentPathString + '/' + arrayItem.id + '/items';
    });
    return currentPathString;
  }


}
