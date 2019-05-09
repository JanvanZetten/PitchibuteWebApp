import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { ItemModule } from '../shared/item/item.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forFeature(),
    ItemModule
  ]
})
export class StoreModule { }
