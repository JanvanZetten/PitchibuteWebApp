import { Component, OnInit } from '@angular/core';
import { Item } from '../../../Entities/item';
import { HierachyServiceService } from '../hierachy-service/hierachy-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hierachy',
  templateUrl: './hierachy.component.html',
  styleUrls: ['./hierachy.component.scss']
})
export class HierachyComponent implements OnInit {

  items: Observable<Item[]>;
  currentPath: string;

  constructor(private service: HierachyServiceService) { }

  ngOnInit() {
    this.currentPath = '/groups';
    this.items = this.service.displayGroups(this.currentPath);
  }

  clickPath(id: string, type: number) {
    if (type === 1 || type === 2 || type === 3) {
      this.currentPath = this.currentPath + '/' + id + '/items';
      this.items = this.service.displayGroups(this.currentPath);
    } else if (type === 4 || type === 5) { // ADD SOMETHING HERE
      }
  }

  testBTN() {
    this.currentPath = '/groups';
    this.items = this.service.displayGroups(this.currentPath);
  }


}
