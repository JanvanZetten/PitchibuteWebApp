import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupManagerComponent} from './group-manager.component';
import {GroupService} from '../../shared/groups/group-service/group.service';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {GroupModalDeleteComponent} from '../group-modal-delete/group-modal-delete.component';
import {GroupModalRenameComponent} from '../group-modal-rename/group-modal-rename.component';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BsDropdownModule, ModalModule} from 'ngx-bootstrap';


describe('GroupManagerComponent', () => {
  let component: GroupManagerComponent;
  let fixture: ComponentFixture<GroupManagerComponent>;
  let debugElement: DebugElement;
  let service: GroupService;
  let groupServiceStub: any;
  let thenStub: any;
  let catchStub: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ModalModule.forRoot(),
        BsDropdownModule.forRoot(),
        ReactiveFormsModule,
      ],
      declarations: [GroupManagerComponent,
        GroupModalRenameComponent,
        GroupModalDeleteComponent,
      ConfirmationDialogComponent],
      providers: [
        {provide: GroupService, useValue: groupServiceStub},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    groupServiceStub = jasmine.createSpyObj('GroupService', ['addUserToGroup', 'renameItem']);
    thenStub = jasmine.createSpyObj('Then', ['then']);
    catchStub = jasmine.createSpyObj('Catch', ['catch']);

    fixture = TestBed.createComponent(GroupManagerComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    service = TestBed.get(GroupService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**it('should call renameItem and hit service aswell', () => {
    TestBed.get(GroupService).renameItem.and.returnValue(new Promise((resolve, reject) => {
      resolve('Successful');
    }));

    component.renameItem(null, null, null);
    expect(service.renameItem).toHaveBeenCalled();
  });
   it('Should fail and go to catch when calling renameItem', () => {
    TestBed.get(GroupService).renameItem.and.returnValue(new Promise((resolve, reject) => {
      reject('not Successful');
    }));

    component.renameItem(null, null, null);
    expect(service.renameItem).toHaveBeenCalled();
  });**/

  it('Should call AddUserToGroup method and hit service aswell', () => {
    TestBed.get(GroupService).addUserToGroup.and.returnValue(new Promise((resolve, reject) => {
      resolve('Successful');
    }));
    component.addUserToGroup('Random@email.dk', null);
    expect(service.addUserToGroup).toHaveBeenCalled();
  });

  it('Should fail and go to catch when calling addUserToGroup', () => {
    TestBed.get(GroupService).addUserToGroup.and.returnValue(new Promise((resolve, reject) => {
      reject('not Successful');
    }));
    component.addUserToGroup('Random@email.dk', null);
    expect(service.addUserToGroup).toHaveBeenCalled();
  });
});
