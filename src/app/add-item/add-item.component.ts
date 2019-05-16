import { Store } from '@ngxs/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { type, Item } from '../entities/item';
import { FormGroup, FormControl } from '@angular/forms';
import { ItemState } from '../store/state/item.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit, OnDestroy {
  path: Item[]
  showModal = false
  itemType: type

  // Used to save subscriptions to unsubscribe when destroyed
  private subscriptions: Subscription[] = []

  addItemForm = new FormGroup({
    name: new FormControl()
  })

  constructor(private store: Store) { }

  ngOnInit() {
    const sub = this.store.select(ItemState.getPath).subscribe(path => this.path = path)
    this.subscriptions.push(sub)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe)
  }

  openAddGroup() {
    this.openModal(type.group)
  }

  openAddEvent() {
    this.openModal(type.event)
  }

  openAddFolder() {
    this.openModal(type.folder)
  }

  openAddLink() {
    this.openModal(type.link)
  }

  openModal(itemType: type) {
    this.itemType = itemType
    this.showModal = true
  }

  newIsOfTypeLink() {
    return this.itemType == type.link
  }

  newIsOfTypeEvent() {
    return this.itemType == type.event
  }

  showEventType(): boolean {
    // This is here because the template does not nativly support enums
    if (this.path.length === 0) {
      return false
    }
    return this.path[this.path.length - 1].type === type.group
  }

  showLinkType(): boolean {
    // This is here because the template does not nativly support enums
    if (this.path.length === 0) {
      return false
    }
    const parentType = this.path[this.path.length - 1].type;
    return parentType === type.event || parentType === type.folder
  }

  getTypeAsString(): string {
    return type[this.itemType]
  }

  addItem() {

  }
}
