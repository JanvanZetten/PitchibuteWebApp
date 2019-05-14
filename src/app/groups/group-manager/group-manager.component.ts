import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../entities/group';
import {GroupService} from '../../shared/groups/group-service/group.service';
import {Item, type} from '../../entities/item';


@Component({
  selector: 'app-group-manager',
  templateUrl: './group-manager.component.html',
  styleUrls: ['./group-manager.component.scss']
})
export class GroupManagerComponent implements OnInit {

  @Input() item: Item;
  errorMessage: string;
  responseMessage: string;
  groupForTest: Group = {id: '123', type: type.file, name: '123', items: null};

  constructor(private groupService: GroupService) {
  }

  ngOnInit() {
  }

  renameItem(collection: string, doc: string, newName: string) {
    this.groupService.renameItem(collection, doc, newName).then(response => {
      this.responseMessage = response;
    }).catch(error => {
      this.errorMessage = error.error;
    });
  }

  addUserToGroup(email: string) {
    this.groupService.addUserToGroup(this.groupForTest, email).then(response => {
      this.responseMessage = response;
    }).catch( error => {
      this.errorMessage = error.error;
    });
  }
}
