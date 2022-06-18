import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OPBillingComponent } from './op-billing.component';

describe('OPBillingComponent', () => {
  let component: OPBillingComponent;
  let fixture: ComponentFixture<OPBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OPBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OPBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
