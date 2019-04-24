import { Injectable } from '@angular/core';
import { FileUploadServiceModule } from './file-upload-service.module';

/*
 * FileUploadService used to upload files.
 */
@Injectable({
  providedIn: FileUploadServiceModule
})
export class FileUploadService {

  constructor() { }
}
