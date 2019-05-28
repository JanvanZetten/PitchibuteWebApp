import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { HierachyComponent } from './hierachy/hierachy.component';
import { HierachyServiceModule } from './hierachy-service/hierachy-service.module';
import { FileUploadModule } from '../../file-upload/file-upload.module';
import {GroupsModule} from '../../groups/groups.module';
import { NgxsModule } from '@ngxs/store';
import { ItemState } from 'src/app/store/state/item.state';
import { StoreModule } from 'src/app/store/store.module';

@NgModule({
  declarations: [
    HierachyComponent,
  ],
  imports: [
    SharedModule,
    HierachyServiceModule,
    FileUploadModule,
    GroupsModule,
    NgxsModule.forFeature([ItemState]),
    StoreModule
  ],
  exports: [
    HierachyComponent
  ]
})
export class HierachyModule { }
