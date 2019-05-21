import { NgxsModule, Store } from '@ngxs/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddItemComponent } from './add-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

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
});
