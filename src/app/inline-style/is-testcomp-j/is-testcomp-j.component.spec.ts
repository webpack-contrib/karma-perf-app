import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsTestcompJComponent } from './is-testcomp-j.component';

describe('Component: IsTestcompJComponent', () => {
  let component: IsTestcompJComponent;
  let fixture: ComponentFixture<IsTestcompJComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsTestcompJComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsTestcompJComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });
});
