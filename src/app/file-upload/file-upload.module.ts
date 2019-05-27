import { NgModule } from '@angular/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FileUploadComponent } from './file-upload.component';
import { FileUploadServiceModule } from '../shared/file-upload/file-upload-service/file-upload-service.module';
import { SharedModule } from '../shared/shared.module';


/*
 * Module for File Upload Component.
 */
@NgModule({
  declarations: [
    FileUploadComponent,
  ],
  imports: [
    SharedModule,
    NgxDropzoneModule,
    FileUploadServiceModule,
  ],
  exports: [
    FileUploadComponent
  ]
})
export class FileUploadModule { }
