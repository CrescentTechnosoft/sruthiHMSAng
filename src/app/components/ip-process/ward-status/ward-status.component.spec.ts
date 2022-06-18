import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WardStatusComponent } from './ward-status.component';

describe('WardStatusComponent', () => {
  let component: WardStatusComponent;
  let fixture: ComponentFixture<WardStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WardStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
