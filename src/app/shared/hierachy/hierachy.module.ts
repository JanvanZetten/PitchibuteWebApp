import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { HierachyComponent } from './hierachy/hierachy.component';
import { HierachyServiceModule } from './hierachy-service/hierachy-service.module';
import { FileUploadModule } from '../file-upload/file-upload.module';
import {GroupsModule} from '../../groups/groups.module';

@NgModule({
  declarations: [
    HierachyComponent,
  ],
  imports: [
    SharedModule,
    HierachyServiceModule,
    FileUploadModule,
    GroupsModule
  ],
  exports: [
    HierachyComponent
  ]
})
export class HierachyModule { }
