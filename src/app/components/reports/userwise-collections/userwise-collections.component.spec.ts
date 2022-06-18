import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserwiseCollectionsComponent } from './userwise-collections.component';

describe('UserwiseCollectionsComponent', () => {
  let component: UserwiseCollectionsComponent;
  let fixture: ComponentFixture<UserwiseCollectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserwiseCollectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserwiseCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
