import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DownloadfileComponent} from './downloadfile/downloadfile.component';

const routes: Routes = [
  {
    path: '',
    component: DownloadfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadRoutingModule { }
