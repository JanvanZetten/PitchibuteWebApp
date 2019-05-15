import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HierachyComponent } from '../shared/hierachy/hierachy/hierachy.component';
import { FileUploadComponent } from '../shared/file-upload/file-upload/file-upload.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HierachyServiceService } from '../shared/hierachy/hierachy-service/hierachy-service.service';
import { FileUploadService } from '../shared/file-upload/file-upload-service/file-upload.service';
import { NgxsModule } from '@ngxs/store';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        HierachyComponent,
        FileUploadComponent
      ],
      providers: [
        { provide: HierachyServiceService, useClass: HierachyServiceStub },
        { provide: FileUploadService, useClass: FileUploadCServiceStub },
      ],
      imports: [
        [NgxDropzoneModule, NgxsModule.forRoot()],
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

export class HierachyServiceStub {
  getChildItemsFromFirebaseFunction() { }
}
export class FileUploadCServiceStub { }
