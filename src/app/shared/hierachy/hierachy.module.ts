import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { HierachyComponent } from './hierachy/hierachy.component';
import {HierachyServiceModule} from './hierachy-service/hierachy-service.module';

@NgModule({
  declarations: [
    HierachyComponent
  ],
  imports: [
    SharedModule,
    HierachyServiceModule
  ],
  exports: [
    HierachyComponent
  ]
})
export class HierachyModule { }
