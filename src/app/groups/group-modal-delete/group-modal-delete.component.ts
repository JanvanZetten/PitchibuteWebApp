import {Component, Input, OnInit} from '@angular/core';
import {GroupService} from '../../shared/groups/group-service/group.service';
import {Item} from '../../entities/item';

@Component({
  selector: 'app-group-modal-delete',
  templateUrl: './group-modal-delete.component.html',
  styleUrls: ['./group-modal-delete.component.scss']
})
export class GroupModalDeleteComponent implements OnInit {

  @Input() item: Item;
  title: string;
  paragraph: string;
  errorMessage: string;
  responseMessage: string;
  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.title = 'Confirmation Dialog';
    this.paragraph = 'Are you sure you want to delete this item?';
  }

  deleteItem() {
 this.groupService.deleteItem(this.item).then(response => {
      this.responseMessage = response;
    }).catch(error => {
      this.errorMessage = error.error;
    });
  }

}
