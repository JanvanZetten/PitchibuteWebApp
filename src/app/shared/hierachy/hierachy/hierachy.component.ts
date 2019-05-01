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
  constructor(private service: HierachyServiceService) { }

  ngOnInit() {
    this.service.displayGroups().subscribe( items => {
      this.items = items;
    });
  }


}
