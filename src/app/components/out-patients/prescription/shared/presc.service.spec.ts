import { TestBed } from '@angular/core/testing';

import { PrescService } from './presc.service';

describe('PrescService', () => {
  let service: PrescService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrescService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
