import { Injectable } from '@angular/core';
import { FileUploadServiceModule } from './file-upload-service.module';
import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { IFile } from '../../../entities/file';
import { Item, type } from 'src/app/entities/item';

/*
 * FileUploadService used to upload files.
 */
@Injectable({
  providedIn: FileUploadServiceModule
})
export class FileUploadService {

  constructor(private firestore: AngularFirestore,
    private firestorage: AngularFireStorage) { }

  upload(parentStructure: Item[], file: File): Observable<IFile> {
    const path = this.getParentPath(parentStructure);
    const uid = this.firestore.createId();
    return defer(() =>
      this.firestorage.ref('file/' + uid)
        .put(file, {
          customMetadata: {
            originalName: file.name,
            path: path
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

  private getParentPath(parentStructure: Item[]): string {
    var path: string
    parentStructure.forEach(item => {
      if (item.id !== null && item.id !== '' && (item.type === type.group || item.type === type.folder || item.type === type.event)) {
        path = path + item.id + '/'
      } else {
        throw new Error("Can't place a file here, check the structure and id's")
      }
    })
    return path
  }
}
