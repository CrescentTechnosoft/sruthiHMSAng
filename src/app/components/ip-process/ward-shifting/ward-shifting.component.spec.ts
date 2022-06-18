import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WardShiftingComponent } from './ward-shifting.component';

describe('WardShiftingComponent', () => {
  let component: WardShiftingComponent;
  let fixture: ComponentFixture<WardShiftingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WardShiftingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardShiftingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
