import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LmTestcompOComponent } from './lm-testcomp-o.component';

describe('LmTestcompOComponent', () => {
  let component: LmTestcompOComponent;
  let fixture: ComponentFixture<LmTestcompOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LmTestcompOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LmTestcompOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
