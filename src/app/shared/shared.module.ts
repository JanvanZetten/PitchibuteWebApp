import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import {CommonModule} from '@angular/common';

/*
 * Shared Module between page specific modules.
 */
@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ConfirmationDialogComponent
  ]
})
export class SharedModule { }
