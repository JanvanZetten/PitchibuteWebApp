import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {GroupService} from '../../shared/groups/group-service/group.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Item} from '../../entities/item';
import {ModalService} from '../../shared/modal-service/modal.service';

@Component({
  selector: 'app-group-modal-add-user',
  templateUrl: './group-modal-add-user.component.html',
  styleUrls: ['./group-modal-add-user.component.scss']
})
export class GroupModalAddUserComponent implements OnInit {
  @Input() item: Item;
  errorMessage: string;
  responseMessage: string;
  modalId: string;
  loading = false;

  addUserForm = new FormGroup({
    email: new FormControl(''),
  });

  constructor(private groupService: GroupService,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.modalId = this.item.id + 'Add';
    this.modalService.addModal({id: this.modalId, show: false});
  }

  getBoolean() {
    return this.modalService.getBoolean(this.modalId);
  }

  openModal() {
    this.errorMessage = '';
    this.modalService.open(this.modalId);
  }

  closeModal() {
    this.modalService.close(this.modalId);
  }


  addUserToGroup(item: Item) {
    this.loading = true;
    const email = this.addUserForm.get('email').value;
    this.groupService.addUserToGroup(item, email).then(response => {
      this.responseMessage = response;
      this.closeModal();
    }).catch(error => {
      this.errorMessage = error.error;
    }).finally(() => {
      this.addUserForm.reset();
      this.loading = false;
    });
  }

}
