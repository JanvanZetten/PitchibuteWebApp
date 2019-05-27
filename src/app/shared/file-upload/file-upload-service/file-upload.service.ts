import { Injectable } from '@angular/core';
import { FileUploadServiceModule } from './file-upload-service.module';
import { defer, Observable, throwError, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { IFile } from '../../../entities/file';
import { Item, type } from 'src/app/entities/item';
import { AuthenticationService } from '../../authentication/authentication-service/authentication.service';
import { Item as IItem } from '../../../entities/item';

/*
 * FileUploadService used to upload files.
 */
@Injectable({
  providedIn: FileUploadServiceModule
})
export class FileUploadService {

  constructor(private firestore: AngularFirestore,
    private firestorage: AngularFireStorage,
    private authenticationService: AuthenticationService) {
  }

  upload(parentStructure: Item[], file: File): Observable<number> {
    let path: string;
    try {
      path = this.getParentPath(parentStructure);
    } catch (error) {
      return throwError(error);
    }
    const uid = this.firestore.createId()
    if (!path) {
      return throwError(new Error('Missing Path'));
    }

    return defer(() => this.authenticationService.getToken()).pipe(switchMap(token => {
      return this.firestorage.ref('files/' + uid)
        .put(file,
          {
            customMetadata: {
              originalName: file.name,
              path: path,
              token: token,
            }
          }).percentageChanges();
    }));
  }

  private getParentPath(parentStructure: IItem[]): string {
    var path: string = ''
    if (parentStructure === undefined || parentStructure === null || parentStructure.length === 0) {
      return path
    }
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
