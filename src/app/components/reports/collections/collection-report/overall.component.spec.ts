import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverAllReportComponent } from './overall.component';

describe('OverAllReportComponent', () => {
  let component: OverAllReportComponent;
  let fixture: ComponentFixture<OverAllReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverAllReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverAllReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
