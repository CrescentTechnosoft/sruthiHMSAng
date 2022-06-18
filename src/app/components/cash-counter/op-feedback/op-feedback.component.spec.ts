import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpFeedbackComponent } from './op-feedback.component';

describe('OpFeedbackComponent', () => {
  let component: OpFeedbackComponent;
  let fixture: ComponentFixture<OpFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
