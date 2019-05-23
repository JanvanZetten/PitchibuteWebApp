import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadfileComponent } from './downloadfile/downloadfile.component';
import { FileDownloadServiceModule } from '../shared/file-download/file-download-service.module';

@NgModule({
  declarations: [DownloadfileComponent],
  exports: [DownloadfileComponent],
  imports: [
    CommonModule,
    FileDownloadServiceModule,
  ],
})
export class DownloadModule { }
