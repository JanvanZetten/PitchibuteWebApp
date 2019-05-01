import { Component, OnInit } from '@angular/core';
import {Group} from '../../Entities/group';
import {User} from 'firebase';
import {GroupService} from '../../shared/groups/group-service/group.service';
import {type} from '../../Entities/item';


@Component({
  selector: 'app-group-manager',
  templateUrl: './group-manager.component.html',
  styleUrls: ['./group-manager.component.scss']
})
export class GroupManagerComponent implements OnInit {

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    // Midlertidig hardcoded.
    const group = <Group> {
      name: 'files/',
      type: type.folder,
      id: 'uOIbfh63rY27JezVCgWa'
    };
    this.groupService.addUserToGroup(group, '.....').subscribe(user => {
      console.log(user);
    });
  }
}
