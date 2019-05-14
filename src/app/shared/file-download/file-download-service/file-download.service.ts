import { Injectable } from '@angular/core';
import {FileDownloadServiceModule} from '../file-download-service.module';
import { Observable, defer } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication/authentication-service/authentication.service';

@Injectable({
  providedIn: FileDownloadServiceModule
})
export class FileDownloadService {

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) { }

  /*
   * Using a function to download file.
   */
  downloadFileFromFunctions(path: string): Observable<{ fileName: string, blob: Blob }> {
    return defer(() => this.authenticationService.getToken()).pipe(switchMap(token => {
      // Create url
      const url = 'https://us-central1-pitchibute.cloudfunctions.net/downloadfile';

      // set content and content type.
      const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token);
      const body = { path: path };

      // Make HTTP Request.
      return this.http.post(url,
        body,
        {
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
        return { fileName: fileName, blob: response.body };
      }));
    }));
  }
}
