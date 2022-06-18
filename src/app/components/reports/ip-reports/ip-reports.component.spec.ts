import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpReportsComponent } from './ip-reports.component';

describe('IpReportsComponent', () => {
  let component: IpReportsComponent;
  let fixture: ComponentFixture<IpReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
