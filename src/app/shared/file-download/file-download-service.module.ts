import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireStorageModule,
    HttpClientModule
  ]
})
export class FileDownloadServiceModule { }
