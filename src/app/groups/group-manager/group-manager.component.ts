import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {GroupService} from '../../shared/groups/group-service/group.service';
import {Item, type} from '../../entities/item';
import {ModalService} from '../../shared/modal-service/modal.service';


@Component({
  selector: 'app-group-manager',
  templateUrl: './group-manager.component.html',
  styleUrls: ['./group-manager.component.scss']
})
export class GroupManagerComponent implements OnInit {

  @Input() item: Item;
  errorMessage: string;

  constructor() {
  }

  ngOnInit() {}

}
