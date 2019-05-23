import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupModalDeleteComponent} from './group-modal-delete.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {GroupService} from '../../shared/groups/group-service/group.service';
import {ModalModule} from 'ngx-bootstrap';

describe('GroupModalDeleteComponent', () => {
  let component: GroupModalDeleteComponent;
  let fixture: ComponentFixture<GroupModalDeleteComponent>;
  let groupServiceStub: any;
  let service: GroupService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      declarations: [GroupModalDeleteComponent],
      providers: [
        {provide: GroupService, useValue: groupServiceStub},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    groupServiceStub = jasmine.createSpyObj('GroupService', ['deleteItem']);
    fixture = TestBed.createComponent(GroupModalDeleteComponent);
    component = fixture.componentInstance;
    component.item = {id: '123', type: 0, name: '123'};
    component.modalId = component.item + '123';
    fixture.detectChanges();
    service = TestBed.get(GroupService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should hit then in deleteItem', () => {
    const item = component.item = {id: '123', type: 0, name: '123'};
    TestBed.get(GroupService).deleteItem.and.returnValue(new Promise(resolve => {
      resolve('123');
    }));
    component.deleteItem();
    expect(service.deleteItem(item));
  });

  it('Should hit deleteItem catch', () => {
    const item = component.item = {id: '123', type: 0, name: '123'};
    TestBed.get(GroupService).deleteItem.and.returnValue(new Promise((resolve, reject) => {
      reject('123');
    }));
    component.deleteItem();
    expect(service.deleteItem(item));
  });
});
