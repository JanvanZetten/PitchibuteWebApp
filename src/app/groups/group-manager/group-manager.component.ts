import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Group} from '../../entities/group';
import {GroupService} from '../../shared/groups/group-service/group.service';
import {Item, type} from '../../entities/item';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GroupModalRenameComponent} from '../group-modal-rename/group-modal-rename.component';


@Component({
  selector: 'app-group-manager',
  templateUrl: './group-manager.component.html',
  styleUrls: ['./group-manager.component.scss']
})
export class GroupManagerComponent implements OnInit {

  @Input() item: Item;
  errorMessage: string;
  responseMessage: string;
  modalRef: BsModalRef;

  constructor(private groupService: GroupService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
  }

  openModal(template: GroupModalRenameComponent) {
    this.modalRef = this.modalService.show(template);
  }

  addUserToGroup(email: string, item: Item) {
    this.groupService.addUserToGroup(item, email).then(response => {
      this.responseMessage = response;
    }).catch(error => {
      this.errorMessage = error.error;
    });
  }
}
