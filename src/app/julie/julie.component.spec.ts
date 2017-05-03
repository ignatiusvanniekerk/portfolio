/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JulieComponent } from './julie.component';

describe('JulieComponent', () => {
  let component: JulieComponent;
  let fixture: ComponentFixture<JulieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JulieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JulieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
