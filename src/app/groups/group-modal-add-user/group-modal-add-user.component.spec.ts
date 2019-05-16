import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupModalAddUserComponent } from './group-modal-add-user.component';

describe('GroupModalAddUserComponent', () => {
  let component: GroupModalAddUserComponent;
  let fixture: ComponentFixture<GroupModalAddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupModalAddUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupModalAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
