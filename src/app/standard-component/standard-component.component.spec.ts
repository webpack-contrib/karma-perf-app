import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardComponentComponent } from './standard-component.component';

describe('Component: StandardComponentComponent', () => {
  let component: StandardComponentComponent;
  let fixture: ComponentFixture<StandardComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });
});
