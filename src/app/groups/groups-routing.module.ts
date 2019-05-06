import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroupManagerComponent} from './group-manager/group-manager.component';

const routes: Routes = [
  {path: '', component: GroupManagerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
