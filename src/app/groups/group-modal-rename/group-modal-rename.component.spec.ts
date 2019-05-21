import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupModalRenameComponent} from './group-modal-rename.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {GroupService} from '../../shared/groups/group-service/group.service';
import {BsModalService, ModalModule} from 'ngx-bootstrap';
import {mod} from 'ngx-bootstrap/chronos/utils';
import {Test} from 'tslint';

describe('GroupModalRenameComponent', () => {
  let component: GroupModalRenameComponent;
  let fixture: ComponentFixture<GroupModalRenameComponent>;
  let groupServiceStub: any;
  let modalServiceStub: any;
  let service: GroupService;
  let modalService: BsModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModalModule.forRoot()],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      declarations: [GroupModalRenameComponent],
      providers: [
        {provide: GroupService, useValue: groupServiceStub},
        {provide: BsModalService, useValue: modalServiceStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    groupServiceStub = jasmine.createSpyObj('GroupService', ['addUserToGroup', 'renameItem']);
    modalServiceStub = jasmine.createSpyObj('modalService', ['show']);
    fixture = TestBed.createComponent(GroupModalRenameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(GroupService);
    modalService = TestBed.get(BsModalService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal', () => {
    component.item = {name: '123', id: '123', type: 1};
    TestBed.get(BsModalService).show.and.returnValue(new Promise(resolve => {
      resolve('123');
    }));
    component.openModal();
    expect(modalService.show).toHaveBeenCalledTimes(1);
  });

  it('should call renameItem and hit service aswell', () => {
    TestBed.get(GroupService).renameItem.and.returnValue(new Promise((resolve, reject) => {
      resolve('Successful');
    }));
    const item = component.item = {id: '123', type: 0, name: '123'};
    component.renameItem(item);
    expect(service.renameItem).toHaveBeenCalled();
  });
  it('Should fail and go to catch when calling renameItem', () => {
    TestBed.get(GroupService).renameItem.and.returnValue(new Promise((resolve, reject) => {
      reject('not Successful');
    }));
    const item = component.item = {id: '123', type: 0, name: '123'};
    component.renameItem(item);
    expect(service.renameItem).toHaveBeenCalled();
  });

});
