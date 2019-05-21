import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {GroupService} from '../../shared/groups/group-service/group.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Item} from '../../entities/item';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal-rename.component.html',
  styleUrls: ['./group-modal-rename.component.scss']
})
export class GroupModalRenameComponent implements OnInit {

  @ViewChild('changeName') public changeName: TemplateRef<any>;
  @Input() item: Item;
  itemForm = new FormGroup({
    currentName: new FormControl( {value: '', disabled: true}),
    newName: new FormControl('')
  });
  errorMessage: string;
  responseMessage: string;
  modalRef: BsModalRef;

  constructor(private groupService: GroupService,
              private modalService: BsModalService) { }

  ngOnInit() {
  }

  openModal() {
    this.modalRef = this.modalService.show(this.changeName);
    this.itemForm.get('currentName').setValue(this.item.name);
  }

  renameItem(item: Item) {
    const newName = this.itemForm.get('newName').value;
    this.groupService.renameItem(item, newName).then(response => {
      this.responseMessage = response;
    }).catch(error => {
      this.errorMessage = error.error;
    }).finally(() => {this.modalRef.hide(); this.itemForm.reset(); });
  }
}
