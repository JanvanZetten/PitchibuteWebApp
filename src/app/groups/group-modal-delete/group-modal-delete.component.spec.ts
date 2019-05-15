import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupModalDeleteComponent } from './group-modal-delete.component';

describe('GroupModalDeleteComponent', () => {
  let component: GroupModalDeleteComponent;
  let fixture: ComponentFixture<GroupModalDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupModalDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
