import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

/*
 * Shared Module between page specific modules.
 */
@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [
    RouterModule,
    ReactiveFormsModule,

  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ConfirmationDialogComponent
  ]
})
export class SharedModule { }
