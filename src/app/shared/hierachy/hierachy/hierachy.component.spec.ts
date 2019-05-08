import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HierachyComponent} from './hierachy.component';
import {HierachyServiceService} from '../hierachy-service/hierachy-service.service';
import {DebugElement} from '@angular/core';
import {FileUploadComponent} from '../../file-upload/file-upload/file-upload.component';
import {FileUploadService} from '../../file-upload/file-upload-service/file-upload.service';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {Item} from '../../../entities/item';
import {Observable, Subscriber} from 'rxjs';


describe('HierachyComponent', () => {
  let component: HierachyComponent;
  let fixture: ComponentFixture<HierachyComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HierachyComponent,
        FileUploadComponent
      ],
      providers: [
        {provide: HierachyServiceService, useClass: HierachyServiceStub},
        {provide: FileUploadService, useClass: FileUploadCServiceStub}
      ],
      imports: [
        [NgxDropzoneModule],
        []
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierachyComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.currentPathItems = setupArray();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a list of items when created', async () => {
    component.ngOnInit();
    component.items.subscribe(result => expect(result.length).toBeGreaterThan(0));
  });

  it('should generate the correct url for an http request', () => {
    const url = '/items/one/items/two/items/three/items';
    expect(url).toBe(component.generateHttpURL());
  });

  it('should add to the local file path when an item is clicked', () => {
    const item4 = <Item>{
      id: 'four',
      name: 'item4',
      type: 2
    };
    expect(component.currentPathItems.length).toBe(3);
    component.clickPath(item4);
    expect(component.currentPathItems.length).toBe(4);
  });

  it('should shave off the path when the "go back" button is pressed', () => {
    expect(component.currentPathItems.length).toBe(3);
    component.clickBack();
    expect(component.currentPathItems.length).toBe(2);
  });

  it('should reset the path when the "go home" button is pressed', () => {
    expect(component.currentPathItems.length).toBe(3);
    component.clickReturnToHome();
    expect(component.currentPathItems.length).toBe(0);
  });

  function setupArray(): Item[] {
    const itemArray = [];
    const item1 = <Item>{
      id: 'one',
      name: 'item1',
      type: 0
    };
    const item2 = <Item>{
      id: 'two',
      name: 'item2',
      type: 1
    };
    const item3 = <Item>{
      id: 'three',
      name: 'item3',
      type: 2
    };
    itemArray[0] = item1;
    itemArray[1] = item2;
    itemArray[2] = item3;
    return itemArray;
  }
});



export class HierachyServiceStub {
  // This function converts the argued array into an Observable<any> to be returned into the component.
  displayItems(items: Item[]): Observable<any> {
    return Observable.create((observer: Subscriber<any>) => {
      observer.next(items);
      observer.complete();
      return observer;
    });
  }
}

export class FileUploadCServiceStub {}
