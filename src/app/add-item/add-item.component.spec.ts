import { NgxsModule, Store } from '@ngxs/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddItemComponent } from './add-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { type } from '../entities/item';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';

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

  it('should return true if itemtype is event', () => {
    component.itemType = type.event
    expect(component.newIsOfTypeEvent()).toBe(true)
  })

  it('should return false if itemtype is not event', () => {
    component.itemType = type.group
    expect(component.newIsOfTypeEvent()).toBe(false)
    component.itemType = type.folder
    expect(component.newIsOfTypeEvent()).toBe(false)
    component.itemType = type.link
    expect(component.newIsOfTypeEvent()).toBe(false)
    component.itemType = type.file
    expect(component.newIsOfTypeEvent()).toBe(false)
  })

  it('should return true if itemtype is link', () => {
    component.itemType = type.link
    expect(component.newIsOfTypeLink()).toBe(true)
  })

  it('should return false if itemtype is not link', () => {
    component.itemType = type.group
    expect(component.newIsOfTypeLink()).toBe(false)
    component.itemType = type.folder
    expect(component.newIsOfTypeLink()).toBe(false)
    component.itemType = type.file
    expect(component.newIsOfTypeLink()).toBe(false)
    component.itemType = type.event
    expect(component.newIsOfTypeLink()).toBe(false)
  })

  it('should return false if path length is 0', () => {
    component.path = []
    expect(component.showEventType()).toBe(false)
  })

  it('should return false if path last item is not type group', () => {
    component.path = [{ name: " ", type: type.event }]
    expect(component.showEventType()).toBe(false)
    component.path = [{ name: " ", type: type.folder }]
    expect(component.showEventType()).toBe(false)
    component.path = [{ name: " ", type: type.link }]
    expect(component.showEventType()).toBe(false)
    component.path = [{ name: " ", type: type.file }]
    expect(component.showEventType()).toBe(false)
  })

  it('should return true if path last item is type group', () => {
    component.path = [{ name: " ", type: type.group }]
    expect(component.showEventType()).toBe(true)
  })

  it('should return false if path length is 0', () => {
    component.path = []
    expect(component.showLinkType()).toBe(false)
  })

  it('should return true if path last item is type event or folder', () => {
    component.path = [{ name: " ", type: type.event }]
    expect(component.showLinkType()).toBe(true)
    component.path = [{ name: " ", type: type.folder }]
    expect(component.showLinkType()).toBe(true)
  })

  it('should return false if path last item is not type event or folder', () => {
    component.path = [{ name: " ", type: type.file }]
    expect(component.showLinkType()).toBe(false)
    component.path = [{ name: " ", type: type.link }]
    expect(component.showLinkType()).toBe(false)
    component.path = [{ name: " ", type: type.group }]
    expect(component.showLinkType()).toBe(false)
  })

  it('should return the type as a string representation of the type', () => {
    component.itemType = type.group
    expect(component.getTypeAsString()).toBe("group")
    component.itemType = type.file
    expect(component.getTypeAsString()).toBe("file")
    component.itemType = type.link
    expect(component.getTypeAsString()).toBe("link")
    component.itemType = type.event
    expect(component.getTypeAsString()).toBe("event")
    component.itemType = type.folder
    expect(component.getTypeAsString()).toBe("folder")
  })

  it('should dispatch addItem action to the store when type is group', () => {
    component.addItemForm.setValue({ name: "testName", url: "testURL", startDate: Date.now, endDate: Date.now })
    component.itemType = type.group
    const store = TestBed.get(Store)
    spyOn(store, 'dispatch').and.returnValue(of(""))
    component.addItem()
    expect(store.dispatch).toHaveBeenCalled()
  })

  it('should dispatch addItem action to the store when type is event', () => {
    component.addItemForm.setValue({ name: "testName", url: "testURL", startDate: Date.now, endDate: Date.now })
    component.itemType = type.event
    const store = TestBed.get(Store)
    spyOn(store, 'dispatch').and.returnValue(of(""))
    component.addItem()
    expect(store.dispatch).toHaveBeenCalled()
  })

  it('should dispatch addItem action to the store when type is folder', () => {
    component.addItemForm.setValue({ name: "testName", url: "testURL", startDate: Date.now, endDate: Date.now })
    component.itemType = type.folder
    const store = TestBed.get(Store)
    spyOn(store, 'dispatch').and.returnValue(of(""))
    component.addItem()
    expect(store.dispatch).toHaveBeenCalled()
  })

  it('should dispatch addItem action to the store when type is link', () => {
    component.addItemForm.setValue({ name: "testName", url: "testURL", startDate: Date.now, endDate: Date.now })
    component.itemType = type.link
    const store = TestBed.get(Store)
    spyOn(store, 'dispatch').and.returnValue(of(""))
    component.addItem()
    expect(store.dispatch).toHaveBeenCalled()
  })

  it('should throw error if addItem is called with type file', () => {
    component.addItemForm.setValue({ name: "testName", url: "testURL", startDate: Date.now, endDate: Date.now })
    component.itemType = type.file
    const store = TestBed.get(Store)
    spyOn(store, 'dispatch')
    expect(function () { component.addItem() }).toThrowError()
  })
});
