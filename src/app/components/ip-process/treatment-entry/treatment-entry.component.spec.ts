import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentEntryComponent } from './treatment-entry.component';

describe('TreatmentEntryComponent', () => {
  let component: TreatmentEntryComponent;
  let fixture: ComponentFixture<TreatmentEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
