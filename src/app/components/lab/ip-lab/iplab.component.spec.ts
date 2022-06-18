import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IPLabComponent } from './iplab.component';

describe('IPLabComponent', () => {
  let component: IPLabComponent;
  let fixture: ComponentFixture<IPLabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IPLabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IPLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
