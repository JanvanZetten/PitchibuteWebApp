import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupManagerComponent } from './group-manager/group-manager.component';
import {GroupServiceModule} from '../shared/groups/group-service.module';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import {ReactiveFormsModule} from '@angular/forms';
import { GroupModalRenameComponent } from './group-modal-rename/group-modal-rename.component';
import { GroupModalDeleteComponent } from './group-modal-delete/group-modal-delete.component';
import {SharedModule} from '../shared/shared.module';
import { GroupModalAddUserComponent } from './group-modal-add-user/group-modal-add-user.component';

@NgModule({
  declarations: [GroupManagerComponent, GroupModalRenameComponent, GroupModalDeleteComponent, GroupModalAddUserComponent],
  exports: [
    GroupManagerComponent
  ],
  imports: [
    CommonModule,
    GroupServiceModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class GroupsModule { }
