import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupManagerComponent } from './group-manager/group-manager.component';
import {GroupServiceModule} from '../shared/groups/group-service.module';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [GroupManagerComponent],
  exports: [
    GroupManagerComponent
  ],
  imports: [
    CommonModule,
    GroupServiceModule,
    BsDropdownModule.forRoot()
  ]
})
export class GroupsModule { }
