import { AuthenticationService } from './../shared/authentication/authentication-service/authentication.service';
import { AddItemComponent } from './../add-item/add-item.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HierachyComponent } from '../hierachy/hierachy.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HierachyServiceService } from '../shared/hierachy/hierachy-service/hierachy-service.service';
import { FileUploadService } from '../shared/file-upload/file-upload-service/file-upload.service';
import { NgxsModule } from '@ngxs/store';
import { ReactiveFormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        HierachyComponent,
        FileUploadComponent,
        AddItemComponent
      ],
      providers: [
        { provide: HierachyServiceService, useClass: HierachyServiceStub },
        { provide: FileUploadService, useClass: FileUploadCServiceStub },
      ],
      imports: [
        [NgxDropzoneModule, NgxsModule.forRoot()],
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

export class HierachyServiceStub {
  getChildItemsFromFirebaseFunction() { }
}
export class FileUploadCServiceStub { }
