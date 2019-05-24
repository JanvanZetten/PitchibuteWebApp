import { Folder } from './../entities/folder';
import { Group } from './../entities/group';
import { Event } from './../entities/event';
import { Store } from '@ngxs/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { type, Item } from '../entities/item';
import { FormGroup, FormControl } from '@angular/forms';
import { ItemState } from '../store/state/item.state';
import { Subscription } from 'rxjs';
import { AddItem } from '../store/actions/item.action';
import { Link } from '../entities/link';
import { first } from 'rxjs/operators';
import { formatDate } from 'ngx-bootstrap';

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
    name: new FormControl(),
    url: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl()
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

  private openModal(itemType: type) {
    this.itemType = itemType
    this.showModal = true
  }

  newIsOfTypeLink() {
    // This is here because the template does not nativly support enums
    return this.itemType == type.link
  }

  newIsOfTypeEvent() {
    // This is here because the template does not nativly support enums
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
    // This is here because the template does not nativly support enums
    return type[this.itemType]
  }

  addItem() {
    const name = this.addItemForm.get('name').value
    const newItem: Item = { name: name, type: this.itemType }

    switch (this.itemType) {
      case type.group:
        (newItem as Group).items = []
        break

      case type.event:
        const start: Date = this.addItemForm.get('startDate').value;
        let end: Date = this.addItemForm.get('endDate').value;
        if (end === null || end === undefined || end.valueOf() === 0) {
          end = start
        }
        (newItem as Event).start = start;
        (newItem as Event).end = end;

      case type.folder:
        (newItem as Event | Folder).resources = []
        break

      case type.link:
        const url: string = this.addItemForm.get('url').value;
        (newItem as Link).url = url
        break

      default:
        throw new Error("Can't add this item type")
    }

    this.store.dispatch(new AddItem(newItem))
    this.showModal = false
  }
}
