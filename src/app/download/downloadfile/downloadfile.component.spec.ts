import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadfileComponent } from './downloadfile.component';
import {AngularFireStorage} from '@angular/fire/storage';
import {FileDownloadService} from '../../shared/file-download/file-download-service/file-download.service';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import { Observable, throwError, of } from 'rxjs';

describe('FileDownloadComponent',
  () => {
    let component: DownloadfileComponent;
    let fixture: ComponentFixture<DownloadfileComponent>;
    let debugElement: DebugElement;
    let userService;
    let userSpy: jasmine.Spy;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
          imports: [
          ],
          declarations: [
            DownloadfileComponent
          ],
          providers: [
            { provide: FileDownloadService, useClass: FileDownloadServiceStub },
            { provide: AngularFireStorage, useClass: AngularFireStorageStub },
          ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(DownloadfileComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
    });

    it('should create', () =>
    {
      expect(component).toBeTruthy();
    });

    it('should trigger download on click on icon', () =>
    {
      component.fileId = "fileId";
      let componentDownloadSpy = spyOn(fixture.componentInstance, 'download').and.callThrough();
      fixture.detectChanges();

      const elementSelected = debugElement.query(By.css('.downloadfile'));
      elementSelected.nativeElement.click();

      expect(componentDownloadSpy).toHaveBeenCalledTimes(1);
    });

    it('should not call service if fileId is not set', () => 
    {
      component.fileId = undefined;
      let componentDownloadSpy = spyOn(fixture.componentInstance, 'download').and.callThrough();
      
      let serviceDownloadSpy = spyOn(TestBed.get(FileDownloadService), 'downloadFileFromFunctions').and.callThrough();
      fixture.detectChanges();

      const elementSelected = debugElement.query(By.css('.downloadfile'));
      elementSelected.nativeElement.click();
      expect(componentDownloadSpy).toHaveBeenCalledTimes(1);
      expect(serviceDownloadSpy).toHaveBeenCalledTimes(0);
    });

    it('should call service if fileId is set', () => {
      component.fileId = "FileId";
      let componentDownloadSpy = spyOn(fixture.componentInstance, 'download').and.callThrough();

      let serviceDownloadSpy = spyOn(TestBed.get(FileDownloadService), 'downloadFileFromFunctions').and.callThrough();
      fixture.detectChanges();

      const elementSelected = debugElement.query(By.css('.downloadfile'));
      elementSelected.nativeElement.click();
      expect(componentDownloadSpy).toHaveBeenCalledTimes(1);
      expect(serviceDownloadSpy).toHaveBeenCalledTimes(1);
    });

    it('should alert on error', () => {
      component.fileId = "FileId";
      let windowAlertSpy = spyOn(window, 'alert').and.callThrough();
      let componentDownloadSpy = spyOn(fixture.componentInstance, 'download').and.callThrough();

      let serviceDownloadSpy = spyOn(TestBed.get(FileDownloadService), 'downloadFileFromFunctions').and.callFake(function () {
        return throwError('error');
      });
      fixture.detectChanges();

      const elementSelected = debugElement.query(By.css('.downloadfile'));
      elementSelected.nativeElement.click();
      expect(windowAlertSpy).toHaveBeenCalledTimes(1);
      expect(componentDownloadSpy).toHaveBeenCalledTimes(1);
      expect(serviceDownloadSpy).toHaveBeenCalledTimes(1);
    });

    it('should create an "a" element',
      () => {
        component.fileId = "FileId";
        let documentCreateElementSpy = spyOn(document, 'createElement').and.callThrough();
        let componentDownloadSpy = spyOn(fixture.componentInstance, 'download').and.callThrough();

        let serviceDownloadSpy = spyOn(TestBed.get(FileDownloadService), 'downloadFileFromFunctions').and.callFake(
          function() {
            return of({ fileName: "bib", blob: "bob" });
          });


        let windowAlertSpy = spyOn(window.URL, 'createObjectURL').and.callFake(function(url) {
          return url;
        });

        fixture.detectChanges();

        const elementSelected = debugElement.query(By.css('.downloadfile'));
        elementSelected.nativeElement.click();

        expect(windowAlertSpy).toHaveBeenCalledTimes(1);
        expect(componentDownloadSpy).toHaveBeenCalledTimes(1);
        expect(serviceDownloadSpy).toHaveBeenCalledTimes(1);
        expect(documentCreateElementSpy).toHaveBeenCalledTimes(1);

        fixture.whenStable().then(() =>
        {
          fixture.detectChanges();

          const createdAElement = debugElement.query(By.css('a'));
          expect(createdAElement.nativeElement.href).toBe('bob');
          expect(createdAElement.nativeElement.download).toBe('bib');
        });
  });
});

export class AngularFireStorageStub { }
export class FileDownloadServiceStub {
  downloadFileFromFunctions(path: string): Observable<{ fileName: string, blob: Blob }> {
    return undefined;
  }
}

