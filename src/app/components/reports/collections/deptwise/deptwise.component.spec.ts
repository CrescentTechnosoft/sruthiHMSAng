import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptwiseComponent } from './deptwise.component';

describe('DeptwiseComponent', () => {
  let component: DeptwiseComponent;
  let fixture: ComponentFixture<DeptwiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeptwiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
