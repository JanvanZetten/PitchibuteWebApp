import {Component, OnInit} from '@angular/core';
import {Group} from '../../Entities/group';
import {GroupService} from '../../shared/groups/group-service/group.service';
import {type} from '../../Entities/item';


@Component({
  selector: 'app-group-manager',
  templateUrl: './group-manager.component.html',
  styleUrls: ['./group-manager.component.scss']
})
export class GroupManagerComponent implements OnInit {

  errorMessage: string;
  responseMessage: string;
  title =  'This is still under construction.';
  groupForTest: Group = {id: '123', type: type.file, name: '123', items:null};

  constructor(private groupService: GroupService) {
  }

  ngOnInit() {
  }

  addUserToGroup(email: string) {
    this.groupService.addUserToGroup(this.groupForTest, email).subscribe(rspMsg => {
      this.responseMessage = rspMsg;
    }, error => {
      this.errorMessage = error.message;
    });
  }
}