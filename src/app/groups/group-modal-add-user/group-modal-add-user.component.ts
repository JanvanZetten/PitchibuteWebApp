import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {GroupService} from '../../shared/groups/group-service/group.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Item} from '../../entities/item';

@Component({
  selector: 'app-group-modal-add-user',
  templateUrl: './group-modal-add-user.component.html',
  styleUrls: ['./group-modal-add-user.component.scss']
})
export class GroupModalAddUserComponent implements OnInit {
  @ViewChild('addUser') public addUser: TemplateRef<any>;

  @Input() item: Item;
  errorMessage: string;
  responseMessage: string;
  modalRef: BsModalRef;

  addUserForm = new FormGroup({
    email: new FormControl(''),
  });

  constructor(private groupService: GroupService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
  }

  openModal() {
    this.modalRef = this.modalService.show(this.addUser);
  }

  addUserToGroup(item: Item) {
    const email = this.addUserForm.get('email').value;
    this.groupService.addUserToGroup(item, email).then(response => {
      this.responseMessage = response;
    }).catch(error => {
      this.errorMessage = error.error;
    }).finally(() => {
      this.addUserForm.reset();
      this.modalRef.hide();
    });
  }

}
