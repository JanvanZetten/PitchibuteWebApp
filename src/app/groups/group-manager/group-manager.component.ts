import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Group} from '../../entities/group';
import {GroupService} from '../../shared/groups/group-service/group.service';
import {Item, type} from '../../entities/item';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GroupModalRenameComponent} from '../group-modal-rename/group-modal-rename.component';
import {ModalService} from '../../shared/modal-service/modal.service';


@Component({
  selector: 'app-group-manager',
  templateUrl: './group-manager.component.html',
  styleUrls: ['./group-manager.component.scss']
})
export class GroupManagerComponent implements OnInit {

  @Input() item: Item;
  errorMessage: string;
  responseMessage: string;

  constructor(private groupService: GroupService,
              private modalService: ModalService) {
  }

  ngOnInit() {}

}
