import { GoBack, ResetPath } from './../../../store/actions/item.action';
import { Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { Item, type } from 'src/app/entities/item';
import { Observable } from 'rxjs';
import { ItemState } from 'src/app/store/state/item.state';
import { NavigateIntoItem } from 'src/app/store/actions/item.action';

@Component({
  selector: 'app-hierachy',
  templateUrl: './hierachy.component.html',
  styleUrls: ['./hierachy.component.scss']
})
export class HierachyComponent implements OnInit {

  items: Observable<Item[]>;
  staticMainPath = '/items';
  currentPathItems: Item[] = [];


  constructor(private store: Store) { }

  ngOnInit() {
    this.items = this.store.select(ItemState.getChildren)
  }

  clickPath(item: Item) {
    if (item.type === type.group || item.type === type.event || item.type === type.folder) {
      this.store.dispatch(new NavigateIntoItem(item))
      this.items = this.store.select(ItemState.getChildren)
    } else if (item.type === type.file || item.type === type.link) {
      // ADD SOMETHING HERE
    }
  }

  clickBack() {
    this.store.dispatch(new GoBack())
    this.items = this.store.select(ItemState.getChildren)
  }

  clickReturnToHome() {
    this.store.dispatch(new ResetPath())
    this.items = this.store.select(ItemState.getChildren)
  }
}
