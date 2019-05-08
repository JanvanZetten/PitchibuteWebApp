import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { HierachyComponent } from './hierachy/hierachy.component';
import { HierachyServiceModule } from './hierachy-service/hierachy-service.module';
import { FileUploadModule } from '../file-upload/file-upload.module';

@NgModule({
  declarations: [
    HierachyComponent,
  ],
  imports: [
    SharedModule,
    HierachyServiceModule,
    FileUploadModule
  ],
  exports: [
    HierachyComponent
  ]
})
export class HierachyModule { }
