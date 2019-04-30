import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { HierachyComponent } from './hierachy/hierachy.component';

@NgModule({
  declarations: [
    HierachyComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    HierachyComponent
  ]
})
export class HierachyModule { }
