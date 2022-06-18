import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { IPAdvanceComponent } from './ip-advance.component';

describe('IPAdvanceComponent', () => {
  let component: IPAdvanceComponent;
  let fixture: ComponentFixture<IPAdvanceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IPAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IPAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
