import { AddItemComponent } from './../add-item/add-item.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HierachyComponent } from './hierachy.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { FileUploadService } from '../shared/file-upload/file-upload-service/file-upload.service';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Item, type } from '../entities/item';
import { of } from 'rxjs';
import { NgxsModule, Store } from '@ngxs/store';
import { GoBack, ResetPath, FetchItems, NavigateIntoItem } from 'src/app/store/actions/item.action';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { GroupManagerComponent } from '../groups/group-manager/group-manager.component';

describe('HierachyComponent', () => {
  let component: HierachyComponent;
  let fixture: ComponentFixture<HierachyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      declarations: [
        HierachyComponent,
        FileUploadComponent,
        AddItemComponent,
        GroupManagerComponent
      ],
      providers: [
        { provide: FileUploadService, useClass: FileUploadCServiceStub }
      ],
      imports: [
        NgxDropzoneModule,
        NgxsModule.forRoot(),
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierachyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set an observable array of items when initiated', async () => {
    const store = TestBed.get(Store);
    spyOn(store, 'select').and.returnValue(of([{}, {}]));
    component.ngOnInit();
    component.items.subscribe(result => expect(result.length).toBeGreaterThan(0));
  });

  it('should call the store with a GoBack action when the clickBack is called', () => {
    const store = TestBed.get(Store);
    spyOn(store, 'dispatch');
    component.clickBack();
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(new GoBack());
  });

  it('should call the store with a ResetPath action when the clickReturnToHome is called', () => {
    const store = TestBed.get(Store);
    spyOn(store, 'dispatch');
    component.clickReturnToHome();
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(new ResetPath());
  });

  it('should call the store with a FetchItems action when the fetchNewItems is called', () => {
    const store = TestBed.get(Store);
    spyOn(store, 'dispatch');
    component.fetchNewItems();
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(new FetchItems());
  });

  it('should call the store with a NavigateIntoItem action when the clickPath is called with a folder, event or group', () => {
    const store = TestBed.get(Store);
    spyOn(store, 'dispatch');
    const navigateItems: Item[] = [
      { name: 'someName', type: type.folder, id:"ads" },
      { name: 'someName', type: type.event, id:"ads" },
      { name: 'someName', type: type.group, id:"ads" }];

    navigateItems.forEach(i => {
      component.clickPath(i);
      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(new NavigateIntoItem(i));
    });
  });

  it('should not call the store with an action when the clickPath is called with a file or link', () => {
    const store = TestBed.get(Store);
    spyOn(store, 'dispatch');

    const navigateItems: Item[] = [
      { name: 'someName', type: type.file, id:"ads" },
      { name: 'someName', type: type.link, id:"ads" }];

    navigateItems.forEach(i => {
      component.clickPath(i);
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  it('should return true if path is set and not root',
    () => {
      component.path = [{ id: 'testId', name: 'testName', type: 2 }];
      expect(component.shouldDisableDropdown()).toBeFalsy();
    });

  it('should return false if path is not set',
    () => {
      component.path = undefined;
      expect(component.shouldDisableDropdown()).toBeTruthy();
    });

  it('should return false if path is root',
    () => {
      component.path = [];
      expect(component.shouldDisableDropdown()).toBeTruthy();
    });
});

class FileUploadCServiceStub {
}
