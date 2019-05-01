import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadfileComponent } from './downloadfile.component';
import {AngularFireStorage} from '@angular/fire/storage';
import {FileDownloadService} from '../../shared/file-download/file-download-service/file-download.service';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

describe('DownloadfileComponent', () => {
  let component: DownloadfileComponent;
  let fixture: ComponentFixture<DownloadfileComponent>;
  let debugElement: DebugElement;
  let userService;
  let userSpy:jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        DownloadfileComponent
      ],
      providers: [
        {provide: FileDownloadService, useClass: FileServiceStub},
        {provide: AngularFireStorage, useClass: AngularFireStorageStub},
        ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadfileComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click button for download file', () => {
    spyOn(component, 'downloadFile');
    fixture.detectChanges();
    const elementSelected = debugElement.query(By.css('#getUrl'));
    elementSelected.nativeElement.click();
    expect(component.downloadFile).toHaveBeenCalled();
  });

});

export class AngularFireStorageStub {}
export class FileServiceStub {}

