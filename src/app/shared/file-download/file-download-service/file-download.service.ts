import { Injectable } from '@angular/core';
import {Group} from '../../../entities/group';
import {AngularFireStorage} from '@angular/fire/storage';
import {FileDownloadServiceModule} from '../file-download-service.module';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { type as Type } from '../../../entities/item';

@Injectable({
  providedIn: FileDownloadServiceModule
})
export class FileDownloadService {

  constructor(private fireStorage: AngularFireStorage,
              private http: HttpClient) { }

  /*
   * Using a function to download file.
   */
  downloadFileFromFunctions(path: string): Observable<{ fileName: string, blob: Blob }> {
    // Create url
    const url = 'https://us-central1-pitchibute.cloudfunctions.net/downloadfile';

    // set content and content type.
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    const body = { path: path };

    // Make HTTP Request.
    return this.http.post(url, body, {
      headers: headers,
      responseType: 'blob' as 'json',
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      // Get Content-Disposition Header.
      var contentDispositionHeader = response.headers.get('Content-Disposition');

      // Get filename from header.
      var fileName = contentDispositionHeader.split(';')[1].trim().split('=')[1];
      // Remove " from filename.
      fileName = fileName.replace(/"/g, '');

      // Return filename and blob.
      return ({ fileName: fileName, blob: response.body });
      }, err => {
        throwError(err);
    }));
  }
}
