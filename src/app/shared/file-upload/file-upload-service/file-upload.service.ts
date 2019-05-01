import { Injectable } from '@angular/core';
import { FileUploadServiceModule } from './file-upload-service.module';
import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { IFile } from '../../../entities/file';

/*
 * FileUploadService used to upload files.
 */
@Injectable({
  providedIn: FileUploadServiceModule
})
export class FileUploadService {

  constructor(private firestore: AngularFirestore,
              private firestorage: AngularFireStorage) { }

  upload(file: File): Observable<IFile> {
    const uid = this.firestore.createId();
    return defer(() =>
      this.firestorage.ref('files/' + uid)
      .put(file, {
        customMetadata: {
          originalName: file.name
        }
      })
      .then()
    ).pipe(
      map(fileRef => {
        fileRef.id = uid;
        return fileRef;
      })
    );
  }
}
