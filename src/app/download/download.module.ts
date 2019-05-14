import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DownloadRoutingModule } from './download-routing.module';
import { DownloadfileComponent } from './downloadfile/downloadfile.component';
import { FileDownloadServiceModule } from '../shared/file-download/file-download-service.module';

@NgModule({
  declarations: [DownloadfileComponent],
  imports: [
    CommonModule,
    DownloadRoutingModule,
    FileDownloadServiceModule,
  ],
})
export class DownloadModule { }
