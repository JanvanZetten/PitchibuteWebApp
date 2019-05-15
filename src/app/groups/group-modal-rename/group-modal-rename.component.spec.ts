import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupModalRenameComponent } from './group-modal-rename.component';

describe('GroupModalRenameComponent', () => {
  let component: GroupModalRenameComponent;
  let fixture: ComponentFixture<GroupModalRenameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupModalRenameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupModalRenameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
