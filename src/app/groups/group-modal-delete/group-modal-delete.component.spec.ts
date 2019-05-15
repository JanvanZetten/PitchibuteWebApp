import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupModalDeleteComponent } from './group-modal-delete.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {GroupService} from '../../shared/groups/group-service/group.service';
import {ModalModule} from 'ngx-bootstrap';

describe('GroupModalDeleteComponent', () => {
  let component: GroupModalDeleteComponent;
  let fixture: ComponentFixture<GroupModalDeleteComponent>;
  let groupServiceStub: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ModalModule.forRoot()],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      declarations: [ GroupModalDeleteComponent ],
      providers: [
        {provide: GroupService, useValue: groupServiceStub},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    groupServiceStub = jasmine.createSpyObj('GroupService', ['addUserToGroup', 'renameItem']);
    fixture = TestBed.createComponent(GroupModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
