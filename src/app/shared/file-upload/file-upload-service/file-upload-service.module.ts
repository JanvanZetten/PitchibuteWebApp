import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';

/*
 * Module for FileUploadService.
 */
@NgModule({
  providers: [
    { provide: StorageBucket, useValue: environment.firebase.storageBucket }
  ],
  declarations: [],
  imports: [
    CommonModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ]
})
export class FileUploadServiceModule { }
