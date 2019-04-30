import { Component, OnInit } from '@angular/core';
import { Item } from '../../../Entities/item';
import { HierachyServiceService } from '../hierachy-service/hierachy-service.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-hierachy',
  templateUrl: './hierachy.component.html',
  styleUrls: ['./hierachy.component.scss']
})
export class HierachyComponent implements OnInit {

  items: Observable<Item[]>;
  userKey: string;
  constructor(private service: HierachyServiceService) { }

  ngOnInit() {
    const key = Object.keys(window.indexedDB).filter(it =>
      it.startsWith('firebase:authUser'))[0];
    this.userKey = key ? JSON.parse(localStorage.getItem(key).get('uid')) : undefined;

    this.items = this.service.displayGroups();
  }


}
