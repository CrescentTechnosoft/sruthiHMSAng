import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorTimingsComponent } from './doctor-timings.component';

describe('DoctorTimingsComponent', () => {
  let component: DoctorTimingsComponent;
  let fixture: ComponentFixture<DoctorTimingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorTimingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorTimingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
