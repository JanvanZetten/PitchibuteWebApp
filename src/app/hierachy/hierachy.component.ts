import { GoBack, ResetPath, FetchItems } from '../store/actions/item.action';
import { Store } from '@ngxs/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item, type } from 'src/app/entities/item';
import { Observable, Subscription } from 'rxjs';
import { ItemState } from 'src/app/store/state/item.state';
import { NavigateIntoItem } from 'src/app/store/actions/item.action';

@Component({
  selector: 'app-hierachy',
  templateUrl: './hierachy.component.html',
  styleUrls: ['./hierachy.component.scss']
})
export class HierachyComponent implements OnInit, OnDestroy {

  items: Observable<Item[]>;
  path: Item[];
  pathSub: Subscription;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.items = this.store.select(ItemState.getChildren);
    this.pathSub = this.store.select(ItemState.getPath).subscribe(p => this.path = p);
  }

  ngOnDestroy(): void {
    this.pathSub.unsubscribe();
  }

  clickPath(item: Item) {
    if (!item.id.startsWith('temp')) {
      if (item.type === type.group || item.type === type.event || item.type === type.folder) {
        this.store.dispatch(new NavigateIntoItem(item));
      } else if (item.type === type.file || item.type === type.link) {
        // ADD SOMETHING HERE
      }
    }
  }

  clickBack() {
    this.store.dispatch(new GoBack());
  }

  clickReturnToHome() {
    this.store.dispatch(new ResetPath());
  }

  fetchNewItems() {
    this.store.dispatch(new FetchItems());
  }

  openMenu(event: MouseEvent) {
    event.stopPropagation();
  }

  shouldDisableDropdown(): boolean {
    console.log(this.path);
    return !this.path || this.path.length < 1;
  }
}
