import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';

/*
 * Shared Module between page specific modules.
 */
@NgModule({
  declarations: [],
  imports: [
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
