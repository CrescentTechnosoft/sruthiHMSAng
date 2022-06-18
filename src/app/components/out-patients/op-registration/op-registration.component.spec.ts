import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OPRegistrationComponent } from './op-registration.component';

describe('OPRegistrationComponent', () => {
  let component: OPRegistrationComponent;
  let fixture: ComponentFixture<OPRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OPRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OPRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
