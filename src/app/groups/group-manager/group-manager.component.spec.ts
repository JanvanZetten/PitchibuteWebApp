import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupManagerComponent} from './group-manager.component';
import {GroupService} from '../../shared/groups/group-service/group.service';
import {DebugElement} from '@angular/core';


describe('GroupManagerComponent', () => {
  let component: GroupManagerComponent;
  let fixture: ComponentFixture<GroupManagerComponent>;
  let debugElement: DebugElement;
  let service: GroupService;
  let groupServiceStub: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupManagerComponent],
      providers: [
        {provide: GroupService, useValue: groupServiceStub},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    groupServiceStub = jasmine.createSpyObj('GroupService', ['addUserToGroup', 'renameItem']);
    groupServiceStub.addUserToGroup.and.returnValue(new Promise((resolve, reject) => {
      resolve('Successful');
      reject('Error');
    }));
    groupServiceStub.renameItem.and.returnValue(new Promise((resolve, reject) => {
      resolve('Successful');
      reject('Error');
    }));

    fixture = TestBed.createComponent(GroupManagerComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    service = TestBed.get(GroupService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call renameItem and hit service aswell', () => {
    component.renameItem(null, null, null);
    expect(service.renameItem).toHaveBeenCalled();
  });

  it('Should call AddUserToGroup method and hit service aswell', () => {
    component.addUserToGroup('Random@email.dk');
    expect(service.addUserToGroup).toHaveBeenCalled();
  });
});
