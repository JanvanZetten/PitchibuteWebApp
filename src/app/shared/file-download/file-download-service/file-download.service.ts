import { Injectable } from '@angular/core';
import {Group} from '../../../Entities/group';
import {AngularFireStorage} from '@angular/fire/storage';
import {FileDownloadServiceModule} from '../file-download-service.module';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: FileDownloadServiceModule
})
export class FileDownloadService {

  constructor(private fireStorage: AngularFireStorage) { }

  downloadFile(fileId: string, group: Group): Observable<any> {
    return this.fireStorage.ref(group.name + fileId).getDownloadURL();
  }
}
