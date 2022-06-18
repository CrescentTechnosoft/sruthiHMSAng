import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyCollectionsComponent } from './monthly-collections.component';

describe('MonthlyCollectionsComponent', () => {
  let component: MonthlyCollectionsComponent;
  let fixture: ComponentFixture<MonthlyCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyCollectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
