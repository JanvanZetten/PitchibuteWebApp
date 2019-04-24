import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../file-upload-service/file-upload.service';
import { IFile } from '../../../Entities/file';

/*
 * Component logic for uploading files.
 */
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  fileChangedEvent: any = '';

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit() {
  }

  // Update local event on change.
  fileChanged(event) {
    this.fileChangedEvent = event;
  }

  // Call upload in FileUploadService in case the an file is chosen.
  uploadFile(): IFile {
    if (this.fileChangedEvent && this.fileChangedEvent.target &&
      this.fileChangedEvent.target.files &&
      this.fileChangedEvent.target.files.length > 0) {
      const file = this.fileChangedEvent.target.files[0];
      this.fileUploadService.upload(file).subscribe(next => {
        return next;
      }, err => {
        return undefined;
      });
    }
    return undefined;
  }
}
