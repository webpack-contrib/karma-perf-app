import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItTestcompNComponent } from './it-testcomp-n.component';

describe('ItTestcompNComponent', () => {
  let component: ItTestcompNComponent;
  let fixture: ComponentFixture<ItTestcompNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItTestcompNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItTestcompNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
