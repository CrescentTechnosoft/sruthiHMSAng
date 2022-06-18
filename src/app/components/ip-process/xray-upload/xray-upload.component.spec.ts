import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XRayUploadComponent } from './xray-upload.component';

describe('XRayUploadComponent', () => {
  let component: XRayUploadComponent;
  let fixture: ComponentFixture<XRayUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XRayUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XRayUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
