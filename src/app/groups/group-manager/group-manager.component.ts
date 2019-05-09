import {Component, OnInit} from '@angular/core';
import {Group} from '../../entities/group';
import {GroupService} from '../../shared/groups/group-service/group.service';
import {type} from '../../entities/item';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-group-manager',
  templateUrl: './group-manager.component.html',
  styleUrls: ['./group-manager.component.scss']
})
export class GroupManagerComponent implements OnInit {

  errorMessage: string;
  responseMessage: string;
  title =  'This is still under construction.';
  groupId;

  constructor(private groupService: GroupService, private acRoute: ActivatedRoute) {
  }

  ngOnInit() {
  }

  addUserToGroup(email: string) {
    this.groupService.addUserToGroup(this.groupId, email).then(rspMsg => {
      this.responseMessage = rspMsg;
    }, error => {
      this.errorMessage = error.message;
      console.log(error);
    });
  }
}
