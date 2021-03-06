import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { customMatchers } from '../../shared/utils/custom-matchers';

import { ItTestcompDComponent } from './it-testcomp-d.component';

describe('Component: ItTestcompDComponent', () => {
  let component: ItTestcompDComponent;
  let fixture: ComponentFixture<ItTestcompDComponent>;

  beforeEach(async(() => {
    jasmine.addMatchers(customMatchers);

    TestBed.configureTestingModule({
      declarations: [ ItTestcompDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItTestcompDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should correctly set the background style', () => {
      expect(fixture.debugElement.children[0].nativeElement).toHaveCssStyle({ 'background-color': 'red'});
  });
});
