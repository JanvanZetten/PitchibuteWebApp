import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {GroupService} from '../../shared/groups/group-service/group.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Item} from '../../entities/item';
import {ModalService} from '../../shared/modal-service/modal.service';

@Component({
  selector: 'app-group-modal-rename',
  templateUrl: './group-modal-rename.component.html',
  styleUrls: ['./group-modal-rename.component.scss']
})
export class GroupModalRenameComponent implements OnInit {

  @Input() item: Item;
  modalId: string;
  itemForm = new FormGroup({
    currentName: new FormControl({value: '', disabled: true}),
    newName: new FormControl('')
  });
  errorMessage: string;
  responseMessage: string;

  constructor(private groupService: GroupService, private modalService: ModalService) {
  }

  ngOnInit() {
    this.modalId = this.item.id + 'Rename';
    this.modalService.addModal({id: this.modalId, show: false});
  }

  getBoolean() {
    return this.modalService.getBoolean(this.modalId);
  }

  openModal() {
    this.errorMessage = '';
    this.modalService.open(this.modalId);
    this.itemForm.get('currentName').setValue(this.item.name);
  }

  closeModal() {
    this.modalService.close(this.modalId);
  }

  renameItem() {
    const newName = this.itemForm.get('newName').value;
    this.groupService.renameItem(this.item, newName).then(response => {
      this.responseMessage = response;
      this.closeModal();
    }).catch(error => {
      this.errorMessage = error.error;
    }).finally(() => {
      this.itemForm.get('newName').reset();
    });
  }
}
