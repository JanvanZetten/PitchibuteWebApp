import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupModalAddUserComponent} from './group-modal-add-user.component';
import {GroupService} from '../../shared/groups/group-service/group.service';
import {ReactiveFormsModule} from '@angular/forms';

describe('GroupModalAddUserComponent', () => {
  let component: GroupModalAddUserComponent;
  let fixture: ComponentFixture<GroupModalAddUserComponent>;
  let service: GroupService;
  let groupServiceStub: any;
  let thenStub: any;
  let catchStub: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupModalAddUserComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: GroupService, useValue: groupServiceStub}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    groupServiceStub = jasmine.createSpyObj('GroupService', ['addUserToGroup', 'renameItem']);
    thenStub = jasmine.createSpyObj('Then', ['then']);
    catchStub = jasmine.createSpyObj('Catch', ['catch']);
    fixture = TestBed.createComponent(GroupModalAddUserComponent);
    component = fixture.componentInstance;
    component.item = {id: '123', type: 0, name: '123'};
    component.modalId = component.item + '123';
    fixture.detectChanges();
    service = TestBed.get(GroupService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call AddUserToGroup method and hit service aswell', () => {
    TestBed.get(GroupService).addUserToGroup.and.returnValue(new Promise((resolve, reject) => {
      resolve('Successful');
    }));
    const item = component.item = {id: '123', type: 0, name: '123'};
    component.addUserToGroup(item);
    expect(service.addUserToGroup).toHaveBeenCalled();
  });

  it('Should fail and go to catch when calling addUserToGroup', () => {
    TestBed.get(GroupService).addUserToGroup.and.returnValue(new Promise((resolve, reject) => {
      reject('not Successful');
    }));
    const item = component.item = {id: '123', type: 0, name: '123'};
    component.addUserToGroup(item);
    expect(service.addUserToGroup).toHaveBeenCalled();
  });
});
