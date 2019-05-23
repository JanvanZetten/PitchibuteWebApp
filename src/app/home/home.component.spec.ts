import { GroupManagerComponent } from './../groups/group-manager/group-manager.component';
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
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      declarations: [
        HomeComponent,
        HierachyComponent,
        FileUploadComponent,
        AddItemComponent,
        GroupManagerComponent
      ],
      providers: [
        {provide: HierachyServiceService, useClass: HierachyServiceStub},
        {provide: FileUploadService, useClass: FileUploadCServiceStub},
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

class HierachyServiceStub {
  getChildItemsFromFirebaseFunction() {
  }
}

class FileUploadCServiceStub {
}
