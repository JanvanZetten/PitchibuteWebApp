import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { $ } from 'protractor';
import { By } from '@angular/platform-browser';
import { Input } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have field for entering username', () => {
    fixture.detectChanges
    const input = fixture.debugElement.queryAll(By.css('input')) // tr is Table row
    fail('implement test')
    // expect(input[0]).toBeTruthy //TODO better test of if it is correct 
  });

  it('should have field for entering password', () => {
    fixture.detectChanges
    const input = fixture.debugElement.queryAll(By.css('input')) // tr is Table row
    fail('implement test')
    // expect(input[1]).toBeTruthy // TODO better test of if it is correct
  })
});
