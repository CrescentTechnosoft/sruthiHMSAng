import { TestBed } from '@angular/core/testing';

import { PatientsListService } from './patients-list.service';

describe('PatientsListService', () => {
  let service: PatientsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
