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
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
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
});
