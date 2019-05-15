import { TestBed, async, fakeAsync, discardPeriodicTasks, tick } from '@angular/core/testing';

import { FileDownloadService } from './file-download.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../../authentication/authentication-service/authentication.service';
import { ReplaySubject } from 'rxjs';

describe('FileDownloadService', () => {
  let service: FileDownloadService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    let authenticationServiceMock = jasmine.createSpyObj('AuthenticationService', ['getToken']);
    authenticationServiceMock.getToken.and.returnValue(new Promise((resolve, reject) => {
      resolve('greatToken');
    }));

    TestBed.configureTestingModule({
      providers: [FileDownloadService, { provide: AuthenticationService, useValue: authenticationServiceMock }],
      imports: [
        HttpClientTestingModule
      ]
    });

    service = TestBed.get(FileDownloadService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call a HTTP Request with real URL, if authentication token is set', fakeAsync(() => {
    const httpDownloadMock = new HttpDownloadMock(httpMock);

    const sub1 = service.downloadFileFromFunctions(httpDownloadMock.path).subscribe(res => {
      expect(true).toBeTruthy();

      sub1.unsubscribe();
    });

    tick(50);

    httpDownloadMock.triggerSuccess();
  })); 

  it('should not call a HTTP Request if authentication token is not set', () => {
    const httpDownloadMock = new HttpDownloadMock(httpMock);
    TestBed.get(AuthenticationService).getToken.and.returnValue(new Promise((resolve, reject) => {
      reject('greatError');
    }));

    const sub1 = service.downloadFileFromFunctions(httpDownloadMock.path).subscribe(res => {
      expect(false).toBeTruthy();

      sub1.unsubscribe();
    }, err => {
      expect(true).toBeTruthy();

      sub1.unsubscribe();
    });
  }); 

  it('should call a HTTP Request with Method POST', fakeAsync(() => {
    const httpDownloadMock = new HttpDownloadMock(httpMock);

    const sub1 = service.downloadFileFromFunctions(httpDownloadMock.path).subscribe(res => {
      expect(true).toBeTruthy();

      sub1.unsubscribe();
    });

    tick(50);
    
    httpDownloadMock.triggerSuccess();

    expect(httpDownloadMock.req.request.method).toBe(httpDownloadMock.httpMethod);

    discardPeriodicTasks();
  }));
   
  it('should call a HTTP Request with content type json', fakeAsync(() => {
    const httpDownloadMock = new HttpDownloadMock(httpMock);

    const sub1 = service.downloadFileFromFunctions(httpDownloadMock.path).subscribe(res => {
      expect(true).toBeTruthy();

      sub1.unsubscribe();
    });

    tick(50);

    httpDownloadMock.triggerSuccess();

    expect(httpDownloadMock.req.request.headers.get('Content-Type')).toBe(httpDownloadMock.requestContentType);
  }));
   
  it('should call a HTTP Request with authorization bearer greatToken', fakeAsync(() => {
    const httpDownloadMock = new HttpDownloadMock(httpMock);

    const sub1 = service.downloadFileFromFunctions(httpDownloadMock.path).subscribe(res => {
      expect(true).toBeTruthy();

      sub1.unsubscribe();
    });

    tick(50);

    httpDownloadMock.triggerSuccess();

    expect(httpDownloadMock.req.request.headers.get('Authorization')).toBe(httpDownloadMock.requestAuthorizationHeader);
  }));

  it('should call a HTTP Request with path in body', fakeAsync(() => {
    const httpDownloadMock = new HttpDownloadMock(httpMock);

    const sub1 = service.downloadFileFromFunctions(httpDownloadMock.path).subscribe(res => {
      expect(true).toBeTruthy();

      sub1.unsubscribe();
    });

    tick(50);

    httpDownloadMock.triggerSuccess();

    expect(httpDownloadMock.req.request.body).toEqual({ path: httpDownloadMock.path });
  }));

  it('should return blob from body and decoded base64 file name', fakeAsync(() => {
    const httpDownloadMock = new HttpDownloadMock(httpMock);

    const sub1 = service.downloadFileFromFunctions(httpDownloadMock.path).subscribe(res => {
      expect(res.blob).toEqual(httpDownloadMock.blob);
      expect(res.fileName).toEqual(httpDownloadMock.fileName);

      sub1.unsubscribe();
    });

    tick(50);

    httpDownloadMock.triggerSuccess();

    expect(httpDownloadMock.req.request.body).toEqual({ path: httpDownloadMock.path });
  }));

  it('should create file from response', fakeAsync(() => {
    const httpDownloadMock = new HttpDownloadMock(httpMock);

    const sub1 = service.downloadFileFromFunctions(httpDownloadMock.path).subscribe(res => {
      expect(true).toBeTruthy();

      sub1.unsubscribe();
    });

    tick(50);

    httpDownloadMock.triggerSuccess();
  }));

  it('should catch an error on status code error', fakeAsync(() => {
    const httpDownloadMock = new HttpDownloadMock(httpMock);

    const sub1 = service.downloadFileFromFunctions(httpDownloadMock.path).subscribe(res => {
      expect(false).toBeTruthy();

      sub1.unsubscribe();
    }, err => {
      expect(true).toBeTruthy();

      sub1.unsubscribe();
    });

    tick(50);

    httpDownloadMock.triggerStatusCodeError();
  })); 
});

class HttpDownloadMock {
  httpMock: HttpTestingController;
  req: TestRequest;
  httpMethod = 'POST';
  requestContentType = 'application/json';
  requestAuthorizationHeader = 'Bearer greatToken';
  path = 'bing/bong';

  fileName = 'blib.pdf';
  base64FileName = btoa(this.fileName);
  contentType = 'application/pdf';
  contentDisposition = 'attachment; filename="' + this.base64FileName + '"';
  blob = new Blob([JSON.stringify({ element: 'pdffileforrealsmate' }, null, 2)], { type: 'blob' as 'json' });
  url = 'https://us-central1-pitchibute.cloudfunctions.net/downloadfile';

  constructor(httpMock: HttpTestingController) {
    this.httpMock = httpMock;
  }

  triggerSuccess() {
    this.req = this.httpMock.expectOne(this.url);

    this.req.event(
      new HttpResponse<Blob>({
        headers: new HttpHeaders().set('Content-Type', this.contentType).set('Content-Disposition', this.contentDisposition), body: this.blob
      })
    );
  };

  triggerStatusCodeError() {
    this.req = this.httpMock.expectOne(this.url);

    this.req.event(
      new HttpResponse<Blob>({
        status: 500
      })
    );
  };
}
