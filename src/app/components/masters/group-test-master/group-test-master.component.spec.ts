import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTestMasterComponent } from './group-test-master.component';

describe('GroupTestMasterComponent', () => {
  let component: GroupTestMasterComponent;
  let fixture: ComponentFixture<GroupTestMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupTestMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTestMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
