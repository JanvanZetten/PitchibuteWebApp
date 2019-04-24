import { Component, OnInit } from '@angular/core';
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

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit() {
  }

}
