import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentFixingComponent } from './appointment-fixing.component';

describe('AppointmentFixingComponent', () => {
  let component: AppointmentFixingComponent;
  let fixture: ComponentFixture<AppointmentFixingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentFixingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentFixingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
