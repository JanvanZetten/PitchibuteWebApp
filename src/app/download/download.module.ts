import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DownloadRoutingModule } from './download-routing.module';
import { DownloadfileComponent } from './downloadfile/downloadfile.component';
import { FileDownloadServiceModule } from '../shared/file-download/file-download-service.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [DownloadfileComponent],
  imports: [
    CommonModule,
    DownloadRoutingModule,
    FileDownloadServiceModule,
    HttpClientModule,
  ],
})
export class DownloadModule { }
