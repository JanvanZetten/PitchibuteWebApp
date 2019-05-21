import { NgxsModule, Store } from '@ngxs/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddItemComponent } from './add-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { type } from '../entities/item';

describe('AddItemComponent', () => {
  let component: AddItemComponent;
  let fixture: ComponentFixture<AddItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddItemComponent],
      imports: [NgxsModule.forRoot(), ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemComponent);
    const store = TestBed.get(Store)
    spyOn(store, 'select').and.returnValue(of([]))
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.path = []
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set itemType to group and showmodal to true', () => {
    component.openAddGroup()
    expect(component.showModal).toBe(true)
    expect(component.itemType).toBe(type.group)
  })

  it('should set itemType to event and showmodal to true', () => {
    component.openAddEvent()
    expect(component.showModal).toBe(true)
    expect(component.itemType).toBe(type.event)
  })

  it('should set itemType to folder and showmodal to true', () => {
    component.openAddFolder()
    expect(component.showModal).toBe(true)
    expect(component.itemType).toBe(type.folder)
  })

  it('should set itemType to link and showmodal to true', () => {
    component.openAddLink()
    expect(component.showModal).toBe(true)
    expect(component.itemType).toBe(type.link)
  })
});
