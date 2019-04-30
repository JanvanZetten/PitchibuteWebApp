import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularFireStorageModule} from '@angular/fire/storage';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    AngularFireStorageModule
  ]
})
export class FileDownloadServiceModule { }
