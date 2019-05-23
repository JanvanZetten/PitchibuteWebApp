import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Observable, throwError } from 'rxjs';
import { NgModule, Component, Input, Output, EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';

import { FileUploadComponent } from './file-upload.component';
import { IFile } from '../entities/file';
import { FileUploadService } from '../shared/file-upload/file-upload-service/file-upload.service';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;
  let isFaulty: boolean;

  beforeEach(async(() => {
    isFaulty = false;
    const fileUploadServiceStub = {
      upload: (file: File) => {
        if (isFaulty) {
          return new Observable(() => {
            throw new Error('Test error');
          });
        }
        const returnFile: IFile = { name: 'test', url: 'testURL', size: 7357, type: 4 };
        return of(returnFile);
      }
    };

    TestBed.configureTestingModule({
      imports: [NgxDropzoneModule],
      declarations: [FileUploadComponent],
      providers: [
        { provide: FileUploadService, useValue: fileUploadServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger uploadFile() on fileAdded emit', () => {
    // Spy on component.
    let fileUploadSpy = spyOn(fixture.componentInstance, 'uploadFile').and.callThrough();
    expect(fileUploadSpy).toHaveBeenCalledTimes(0);

    // Get NgxDropzone instance.
    let dropzoneDebug = fixture.debugElement.query(By.directive(NgxDropzoneComponent));
    // Emit file added.
    dropzoneDebug.componentInstance.filesAdded.emit(new Array<File>());

    expect(fileUploadSpy).toHaveBeenCalledTimes(1);
  });

  it('should not call onUpload() on uploadFile() with empty list', () => {
    // Spy on component.
    let onUploadSpy = spyOn<any>(fixture.componentInstance, 'onUpload').and.callThrough();
    expect(onUploadSpy).toHaveBeenCalledTimes(0);

    // Call uploadFile().
    fixture.componentInstance.uploadFile(new Array<File>());

    expect(onUploadSpy).toHaveBeenCalledTimes(0);
  });

  it('should call onUpload(), once, on uploadFile() passing a list with a length of one', () => {
    // Spy on component.
    let onUploadSpy = spyOn<any>(fixture.componentInstance, 'onUpload').and.callThrough();
    expect(onUploadSpy).toHaveBeenCalledTimes(0);

    // Call uploadFile().
    fixture.componentInstance.uploadFile([new File(new Array<Blob>(), 'testFile')]);

    expect(onUploadSpy).toHaveBeenCalledTimes(1);
    expect(onUploadSpy).toHaveBeenCalledWith(jasmine.any(String), true);
  });

  it('should call onUpload(), once, on uploadFile() passing a list with a length of one, but an error occured', () => {
    isFaulty = true;
    // Spy on component.
    let onUploadSpy = spyOn<any>(fixture.componentInstance, 'onUpload').and.callThrough();
    expect(onUploadSpy).toHaveBeenCalledTimes(0);

    // Call uploadFile().
    fixture.componentInstance.uploadFile([new File(new Array<Blob>(), 'testFile')]);

    expect(onUploadSpy).toHaveBeenCalledTimes(1);
    expect(onUploadSpy).toHaveBeenCalledWith(jasmine.any(String), false);
  });

  it('should call onUpload() on uploadFile() passing a list with a length of ten', () => {
    // Spy on component.
    let onUploadSpy = spyOn<any>(fixture.componentInstance, 'onUpload').and.callThrough();
    expect(onUploadSpy).toHaveBeenCalledTimes(0);

    // Call uploadFile().
    fixture.componentInstance.uploadFile([
      new File(new Array<Blob>(), 'testFile'),
      new File(new Array<Blob>(), 'testFile'),
      new File(new Array<Blob>(), 'testFile'),
      new File(new Array<Blob>(), 'testFile'),
      new File(new Array<Blob>(), 'testFile'),
      new File(new Array<Blob>(), 'testFile'),
      new File(new Array<Blob>(), 'testFile'),
      new File(new Array<Blob>(), 'testFile'),
      new File(new Array<Blob>(), 'testFile'),
      new File(new Array<Blob>(), 'testFile'),
    ]);

    expect(onUploadSpy).toHaveBeenCalledTimes(10);
    expect(onUploadSpy).toHaveBeenCalledWith(jasmine.any(String), true);
  });

  it('should update states on UploadFile()', () => {
    let fileUploadComponent = fixture.componentInstance;

    // Overwrite OnUpload so that it does not change the state.
    let onUploadSpy = spyOn<any>(fileUploadComponent, 'onUpload').and.callFake(function () {
      return undefined;
    });
    expect(onUploadSpy).toHaveBeenCalledTimes(0);

    // Check state before.
    expect(!fileUploadComponent.isLoading).toBeTruthy();


    // Call uploadFile().
    fileUploadComponent.uploadFile([new File(new Array<Blob>(), 'testFile')]);

    // Check state after
    expect(fileUploadComponent.isLoading).toBeTruthy();

    expect(onUploadSpy).toHaveBeenCalledTimes(1);
  });

  it('should update states and call startTimer() on onUpload() calls with true', () => {
    let fileUploadComponent = fixture.componentInstance;

    // Spy on start timer.
    let startTimerSpy = spyOn<any>(fileUploadComponent, 'startTimer').and.callThrough();
    expect(startTimerSpy).toHaveBeenCalledTimes(0);

    // Simulate state
    fileUploadComponent.isLoading = true;

    // Check state before
    expect(!fileUploadComponent.hasFailed).toBeTruthy();
    expect(!fileUploadComponent.hasSucceeded).toBeTruthy();
    expect(fileUploadComponent.isLoading).toBeTruthy();

    // Call uploadFile().
    fixture.componentInstance.uploadFile([new File(new Array<Blob>(), 'testFile')]);

    // Check state after
    expect(!fileUploadComponent.hasFailed).toBeTruthy();
    expect(fileUploadComponent.hasSucceeded).toBeTruthy();
    expect(!fileUploadComponent.isLoading).toBeTruthy();

    expect(startTimerSpy).toHaveBeenCalledTimes(1);
  });

  it('should update states and call startTimer() on onUpload() calls with false', () => {
    isFaulty = true;
    let fileUploadComponent = fixture.componentInstance;

    // Spy on start timer.
    let startTimerSpy = spyOn<any>(fileUploadComponent, 'startTimer').and.callThrough();
    expect(startTimerSpy).toHaveBeenCalledTimes(0);

    // Simulate state
    fileUploadComponent.isLoading = true;

    // Check state before
    expect(!fileUploadComponent.hasFailed).toBeTruthy();
    expect(!fileUploadComponent.hasSucceeded).toBeTruthy();
    expect(fileUploadComponent.isLoading).toBeTruthy();

    // Call uploadFile().
    fixture.componentInstance.uploadFile([new File(new Array<Blob>(), 'testFile')]);

    // Check state after
    expect(fileUploadComponent.hasFailed).toBeTruthy();
    expect(!fileUploadComponent.hasSucceeded).toBeTruthy();
    expect(!fileUploadComponent.isLoading).toBeTruthy();

    expect(startTimerSpy).toHaveBeenCalledTimes(1);
  });

  // Mock Dropzone component.
  @Component({
    selector: 'ngx-dropzone',
    template: ''
  })
  class NgxDropzoneComponent {
    @Input() label: string;
    @Output() filesAdded = new EventEmitter<File[]>();
    @Input() disabled: boolean;
    @Input() preserveFiles: boolean;
  }

  // Mock Dropzone module.
  @NgModule({
    declarations: [
      NgxDropzoneComponent,
    ],
    exports: [
      NgxDropzoneComponent,
    ]
  })
  class NgxDropzoneModule { }
});
