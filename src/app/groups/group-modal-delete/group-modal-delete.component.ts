import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-modal-delete',
  templateUrl: './group-modal-delete.component.html',
  styleUrls: ['./group-modal-delete.component.scss']
})
export class GroupModalDeleteComponent implements OnInit {

  title: string;
  paragraph: string;
  constructor() { }

  ngOnInit() {
    this.title = 'Confirmation Dialog';
    this.paragraph = 'Are you sure you want to delete this item?';
  }

  deleteItem() {
    console.log('Deleted');
  }

}
