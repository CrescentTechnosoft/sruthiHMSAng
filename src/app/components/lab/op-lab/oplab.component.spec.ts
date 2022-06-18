import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OPLabComponent } from './oplab.component';

describe('OPLabComponent', () => {
  let component: OPLabComponent;
  let fixture: ComponentFixture<OPLabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OPLabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OPLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
