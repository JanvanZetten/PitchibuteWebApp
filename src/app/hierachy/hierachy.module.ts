import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HierachyComponent } from './hierachy.component';
import { HierachyServiceModule } from '../shared/hierachy/hierachy-service/hierachy-service.module';
import { NgxsModule } from '@ngxs/store';
import { ItemState } from 'src/app/store/state/item.state';
import { StoreModule } from 'src/app/store/store.module';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { AddItemComponent } from '../add-item/add-item.component';

@NgModule({
  declarations: [
    HierachyComponent,
    AddItemComponent,
  ],
  imports: [
    SharedModule,
    HierachyServiceModule,
    FileUploadModule,
    NgxsModule.forFeature([ItemState]),
    StoreModule
  ],
  exports: [
    HierachyComponent
  ]
})
export class HierachyModule { }
