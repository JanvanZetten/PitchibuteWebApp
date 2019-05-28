import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GroupService} from '../../shared/groups/group-service/group.service';
import {Item} from '../../entities/item';
import {ModalService} from '../../shared/modal-service/modal.service';

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
  modalId: string;
  loading = false;

  constructor(private groupService: GroupService, private modalService: ModalService) {
  }

  ngOnInit() {
    this.modalId = this.item.id + 'Delete';
    this.modalService.addModal({id: this.modalId, show: false});
    this.title = 'Confirmation Dialog';
    this.paragraph = 'Are you sure you want to delete this item?';
  }

  openModal() {
    this.errorMessage = '';
    this.modalService.open(this.modalId);
  }

  closeModal() {
    this.modalService.close(this.modalId);
  }

  getBoolean() {
    return this.modalService.getBoolean(this.modalId);
  }


  deleteItem() {
    this.loading = true;
    this.groupService.deleteItem(this.item).then(response => {
      this.responseMessage = response;
      this.closeModal();
    }).catch(error => {
      this.errorMessage = error.error;
    }).finally(() => {
      this.loading = false;
    });
  }

}
