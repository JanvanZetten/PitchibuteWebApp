import { TestBed, async, fakeAsync } from '@angular/core/testing';

import { FileDownloadService } from './file-download.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

describe('FileDownloadService', () => {
  let service: FileDownloadService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileDownloadService],
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

  it('should call a HTTP Request with real URL', () => {
    const httpDownloadMock = new HttpDownloadMock(httpMock);

    service.downloadFileFromFunctions(httpDownloadMock.path).subscribe(res => {
      expect(true).toBeTruthy();
    });

    httpDownloadMock.triggerSuccess();
  });

  it('should call a HTTP Request with Method POST', () => {
    const httpDownloadMock = new HttpDownloadMock(httpMock);

    service.downloadFileFromFunctions(httpDownloadMock.path).subscribe(res => {
      expect(true).toBeTruthy();
    });

    httpDownloadMock.triggerSuccess();

    expect(httpDownloadMock.req.request.method).toBe(httpDownloadMock.httpMethod);
  });

  it('should call a HTTP Request with content type json', () => {
    const httpDownloadMock = new HttpDownloadMock(httpMock);

    service.downloadFileFromFunctions(httpDownloadMock.path).subscribe(res => {
      expect(true).toBeTruthy();
    });

    httpDownloadMock.triggerSuccess();

    expect(httpDownloadMock.req.request.headers.get('Content-Type')).toBe(httpDownloadMock.requestContentType);
  });

  it('should call a HTTP Request with path in body', () => {
    const httpDownloadMock = new HttpDownloadMock(httpMock);

    service.downloadFileFromFunctions(httpDownloadMock.path).subscribe(res => {
      expect(true).toBeTruthy();
    });

    httpDownloadMock.triggerSuccess();

    expect(httpDownloadMock.req.request.body).toEqual({ path: httpDownloadMock.path });
  });

  it('should create file from response', () => {
    const httpDownloadMock = new HttpDownloadMock(httpMock);

    service.downloadFileFromFunctions(httpDownloadMock.path).subscribe(res => {
      expect(res).toEqual(httpDownloadMock.dummyResult);
    });

    httpDownloadMock.triggerSuccess();
  });

  it('should catch an error on status code error', () => {
    const httpDownloadMock = new HttpDownloadMock(httpMock);

    service.downloadFileFromFunctions(httpDownloadMock.path).subscribe(res => {
      expect(false).toBeTruthy();
    }, err => {
      expect(true).toBeTruthy();
    });

    httpDownloadMock.triggerStatusCodeError();
  });
});

class HttpDownloadMock {
  httpMock: HttpTestingController;
  req: TestRequest;
  httpMethod = 'POST';
  requestContentType = 'application/json';
  path = 'bing/bong';

  fileName = 'blib.pdf';
  contentType = 'application/pdf';
  contentDisposition = 'attachment; filename="' + this.fileName + '"';
  blob = new Blob([JSON.stringify({ element: 'pdffileforrealsmate' }, null, 2)], { type: 'blob' as 'json' });
  dummyResult = { fileName: this.fileName, blob: this.blob };
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
