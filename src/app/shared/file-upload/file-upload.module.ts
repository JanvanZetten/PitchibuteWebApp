import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileUploadServiceModule } from './file-upload-service/file-upload-service.module';
import { FileUploadRoutingModule } from './file-upload-routing.module';
import { SharedModule } from '../shared.module';

/*
 * Module for File Upload Component.
 */
@NgModule({
  declarations: [
    FileUploadComponent,
  ],
  imports: [
    SharedModule,
    FileUploadRoutingModule,
    FileUploadServiceModule,
  ]
})
export class FileUploadModule { }
