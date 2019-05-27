import { Item } from '../entities/item';
import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { timer, Subject } from 'rxjs';
import { FileUploadService } from '../shared/file-upload/file-upload-service/file-upload.service';

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
  @Input()
  parentStructure: Item[];
  @Input()
  isDisabled: boolean = false;

  isLoading: boolean = false;
  hasFailed: boolean = false;
  hasSucceeded: boolean = false;
  uploadPercentage: number = 0;

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit() {
  }

  // Call upload in FileUploadService in case a file is chosen.
  uploadFile(files: File[]) {
    files.forEach(file => {
      this.isLoading = true;
      this.fileUploadService.upload(this.parentStructure, file).subscribe(next => {
          this.setPercentage(next);
      },
        err => {
          this.onUpload(err.message, false);
        }, () => {
          this.onUpload(`Successfully transferred: ${file.name}`, true);
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
    this.newPercentage.next();
    this.uploadPercentage = 0;

    const source = timer(3000, 1000);
    const abc = source.subscribe(() => {
      this.hasFailed = false;
      this.hasSucceeded = false;
      abc.unsubscribe();
    });
  }

  newPercentage = new Subject<void>();
  private setPercentage(newValue: number) {
    this.newPercentage.next();

    let count = 0;
    const countTimes = 20;
    let addAmount = newValue - this.uploadPercentage;
    if (addAmount < 0) {
      return;
    }
    addAmount = addAmount / countTimes;

    const source = timer(0, 10);
    const abc = source.subscribe(() => {
      const efg = this.newPercentage.subscribe(() => {
        abc.unsubscribe();
        efg.unsubscribe();
      });
      this.uploadPercentage += addAmount;

      if (count >= countTimes) {
        this.uploadPercentage = newValue;
        abc.unsubscribe();
        efg.unsubscribe();
      }
      count++;
    });
  }
}
