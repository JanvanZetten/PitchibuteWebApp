import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { HierachyComponent } from './hierachy/hierachy.component';
import { HierachyServiceModule } from './hierachy-service/hierachy-service.module';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { NgxsModule } from '@ngxs/store';
import { ItemState } from 'src/app/store/state/item.state';

@NgModule({
  declarations: [
    HierachyComponent,
  ],
  imports: [
    SharedModule,
    HierachyServiceModule,
    FileUploadModule,
    NgxsModule.forFeature([ItemState])
  ],
  exports: [
    HierachyComponent
  ]
})
export class HierachyModule { }
