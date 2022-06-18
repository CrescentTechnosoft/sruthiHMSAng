import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IPBillingComponent } from './ip-billing.component';

describe('IPBillingComponent', () => {
  let component: IPBillingComponent;
  let fixture: ComponentFixture<IPBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IPBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IPBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
