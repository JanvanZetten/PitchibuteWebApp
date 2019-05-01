import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HierachyServiceRoutingModule } from './hierachy-service-routing.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HierachyServiceRoutingModule
  ],
  exports: [
    HttpClientModule
  ]
})
export class HierachyServiceModule { }
