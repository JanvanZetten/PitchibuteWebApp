import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {GroupManagerComponent} from '../../../groups/group-manager/group-manager.component';
import {HierachyComponent} from './hierachy.component';
import {FileUploadComponent} from '../../../file-upload/file-upload.component';
import {FileUploadService} from '../../file-upload/file-upload-service/file-upload.service';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {Item, type} from '../../../entities/item';
import {of} from 'rxjs';
import {NgxsModule, Store} from '@ngxs/store';
import {GoBack, ResetPath, FetchItems, NavigateIntoItem} from 'src/app/store/actions/item.action';

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
        GroupManagerComponent
      ],
      providers: [
        {provide: FileUploadService, useClass: FileUploadCServiceStub}
      ],
      imports: [
        [NgxDropzoneModule, NgxsModule.forRoot()],
        []
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
      {name: 'someName', type: type.folder},
      {name: 'someName', type: type.event},
      {name: 'someName', type: type.group}];

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
      {name: 'someName', type: type.file},
      {name: 'someName', type: type.link}];

    navigateItems.forEach(i => {
      component.clickPath(i);
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});

class FileUploadCServiceStub {
}
