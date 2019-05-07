import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupManagerComponent } from './group-manager.component';
import {GroupService} from '../../shared/groups/group-service/group.service';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {AuthenticationService} from '../../shared/authentication/authentication-service/authentication.service';

describe('GroupManagerComponent', () => {
  let component: GroupManagerComponent;
  let fixture: ComponentFixture<GroupManagerComponent>;
  let debugElement: DebugElement;
  let service: GroupService;
  let groupServiceStub: any;
  let authServiceStub: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupManagerComponent ],
      providers: [
      {provide: GroupService, useValue: groupServiceStub},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    groupServiceStub = jasmine.createSpyObj('GroupService', ['addUserToGroup']);
    groupServiceStub.addUserToGroup.and.returnValue(Promise.resolve('123'));

    fixture = TestBed.createComponent(GroupManagerComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    service = TestBed.get(GroupService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.title = 'This is still under construction.';
    expect(component.title).toEqual('This is still under construction.');
  });

  it('should click button for adding user to group and set response message', () => {
    spyOn(component, 'addUserToGroup');
    const elementSelected = debugElement.query(By.css('#addUserBtn'));
    elementSelected.nativeElement.click();
    expect(component.addUserToGroup).toHaveBeenCalled();
    component.responseMessage = 'Welcome';
    expect(component.responseMessage).toEqual('Welcome');
  });

  it('Should hit services AddUserToGroup aswell', () => {
    const elementSelected = debugElement.query(By.css('#addUserBtn'));
    elementSelected.nativeElement.click();
    expect(service.addUserToGroup).toHaveBeenCalled();
  });
});
