import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';

import { GroupManagerComponent } from './group-manager/group-manager.component';
import {GroupServiceModule} from '../shared/groups/group-service.module';

@NgModule({
  declarations: [GroupManagerComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    GroupServiceModule
  ]
})
export class GroupsModule { }
