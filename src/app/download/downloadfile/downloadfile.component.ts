import {Component, OnInit} from '@angular/core';
import {Group} from '../../entities/group';
import {type} from '../../entities/item';
import {FileDownloadService} from '../../shared/file-download/file-download-service/file-download.service';


@Component({
  selector: 'app-downloadfile',
  templateUrl: './downloadfile.component.html',
  styleUrls: ['./downloadfile.component.scss']
})
export class DownloadfileComponent implements OnInit {
  downloadUrl: string;
  errorMessage: string;
  constructor(private downloadService: FileDownloadService) { }

  ngOnInit() {

  }

  downloadFile() {
    const fileId = '6PUJoOnSWOWQCcuSByAH';
    const group = <Group> {
      name: 'files/',
      type: type.folder
    };
    this.downloadService.downloadFile(fileId, group).subscribe( url => {
      this.downloadUrl = url;
    }, err => {
      this.errorMessage = err.message;
    });
  }

}
