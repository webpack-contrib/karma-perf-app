import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItTestcompKComponent } from './it-testcomp-k.component';

describe('Component: ItTestcompKComponent', () => {
  let component: ItTestcompKComponent;
  let fixture: ComponentFixture<ItTestcompKComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItTestcompKComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItTestcompKComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });
});
