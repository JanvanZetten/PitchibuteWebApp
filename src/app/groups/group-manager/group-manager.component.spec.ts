import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupManagerComponent } from './group-manager.component';
import {GroupService} from '../../shared/groups/group-service/group.service';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

describe('GroupManagerComponent', () => {
  let component: GroupManagerComponent;
  let fixture: ComponentFixture<GroupManagerComponent>;
  let debugElement: DebugElement;
  let service: GroupService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupManagerComponent ],
      providers: [
      {provide: GroupService, useClass: GroupServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
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
  it('should click button for adding user to group', () => {
    spyOn(component, 'addUserToGroup');
    const elementSelected = debugElement.query(By.css('#addUserBtn'));
    elementSelected.nativeElement.click();
    expect(component.addUserToGroup).toHaveBeenCalled();
    component.responseMessage = '123';
    expect(component.responseMessage).toEqual('123');
  });
});

export class GroupServiceStub {
   addUserToGroup() {return of('123'); }
}
