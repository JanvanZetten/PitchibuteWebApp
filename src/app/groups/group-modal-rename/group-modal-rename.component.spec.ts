import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupModalRenameComponent} from './group-modal-rename.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {GroupService} from '../../shared/groups/group-service/group.service';

describe('GroupModalRenameComponent', () => {
  let component: GroupModalRenameComponent;
  let fixture: ComponentFixture<GroupModalRenameComponent>;
  let groupServiceStub: any;
  let modalServiceStub: any;
  let service: GroupService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      declarations: [GroupModalRenameComponent],
      providers: [
        {provide: GroupService, useValue: groupServiceStub},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    groupServiceStub = jasmine.createSpyObj('GroupService', ['addUserToGroup', 'renameItem']);
    modalServiceStub = jasmine.createSpyObj('modalService', ['show']);
    fixture = TestBed.createComponent(GroupModalRenameComponent);
    component = fixture.componentInstance;
    component.item = {id: '123', type: 0, name: '123'};
    component.modalId = component.item + '123';
    fixture.detectChanges();
    service = TestBed.get(GroupService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call renameItem and hit service aswell', () => {
    TestBed.get(GroupService).renameItem.and.returnValue(new Promise((resolve, reject) => {
      resolve('Successful');
    }));
    component.renameItem();
    expect(service.renameItem).toHaveBeenCalled();
  });
  it('Should fail and go to catch when calling renameItem', () => {
    TestBed.get(GroupService).renameItem.and.returnValue(new Promise((resolve, reject) => {
      reject('not Successful');
    }));
    component.renameItem();
    expect(service.renameItem).toHaveBeenCalled();
  });

});
