import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { timer } from 'rxjs';
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
  isLoading: boolean = false;
  hasFailed: boolean = false;
  hasSucceeded: boolean = false;

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit() {
  }

  // Call upload in FileUploadService in case the an file is chosen.
  uploadFile(files: File[]) {
    files.forEach(file => {
      this.isLoading = true;
      this.fileUploadService.upload(file).subscribe(next => {
        this.isLoading = false;
        this.hasSucceeded = true;
        this.startTimer();
      },
      err => {
        this.isLoading = false;
        this.hasFailed = true;
        this.startTimer();
      });
    });
  }

  private startTimer() {
    const source = timer(3000, 1000);
    const abc = source.subscribe(() => {
      this.hasFailed = false;
      this.hasSucceeded = false;
      abc.unsubscribe();
    });
  }
}
