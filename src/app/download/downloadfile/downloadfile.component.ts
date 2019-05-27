import { Component, OnInit, Input } from '@angular/core';
import { FileDownloadService } from '../../shared/file-download/file-download-service/file-download.service';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-download-file',
  templateUrl: './downloadfile.component.html',
  styleUrls: ['./downloadfile.component.scss']
})
export class DownloadfileComponent implements OnInit {
  @Input() fileId: string;
  errorMessage: string;
  constructor(private downloadService: FileDownloadService) { }
  isLoading = false;

  ngOnInit() {

  }

  /*
   * Download file by fileId.
   */
  download() {
    if (!this.isLoading) {
      if (this.fileId) {
        // Append file id to path.
        let filePath = "files/" + this.fileId;
        this.isLoading = true;

        // Use download service to get file.
        this.downloadService.downloadFileFromFunctions(filePath).pipe(finalize(() => {
          this.isLoading = false;
        })).subscribe(
          data => {
            // Create element to download blob.
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(data.blob);
            link.download = data.fileName;
            link.click();
          },
          err => {
            alert("Problem while downloading the file.");
            console.error(err);
          }
        );
      } else {
        alert("FileId not set");
        console.error("File Id not set");
      }
    }
  }
}
