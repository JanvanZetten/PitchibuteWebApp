import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { FileUploadService } from '../file-upload-service/file-upload.service';

/*
 * Component logic for uploading files.
 */
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Output() // Emits event with success message.
  onSuccessEvent = new EventEmitter<string>();
  @Output() // Emits event with error message.
  onErrorEvent = new EventEmitter<string>();

  isLoading: boolean = false;
  hasFailed: boolean = false;
  hasSucceeded: boolean = false;

  constructor(private fileUploadService: FileUploadService) {}

  ngOnInit() {
  }

  // Call upload in FileUploadService in case a file is chosen.
  uploadFile(files: File[]) {
    files.forEach(file => {
      this.isLoading = true;
      this.fileUploadService.upload(file).subscribe(next => {
          this.onUpload(`Successfully transferred: ${file.name}`, true);
        },
        err => {
          this.onUpload(err.message, false);
        });
    });
  }

  // Handles upload results.
  private onUpload(message: string, succeeded: boolean) {
    this.isLoading = false;

    if (succeeded) {
      this.hasSucceeded = true;
      this.onSuccessEvent.emit(message);
    } else {
      this.hasFailed = true;
      this.onErrorEvent.emit(message);
    }

    this.startTimer();
  }

  // Timer for check and cross icon on top of dropzone.
  private startTimer() {
    const source = timer(3000, 1000);
    const abc = source.subscribe(() => {
      this.hasFailed = false;
      this.hasSucceeded = false;
      abc.unsubscribe();
    });
  }
}
