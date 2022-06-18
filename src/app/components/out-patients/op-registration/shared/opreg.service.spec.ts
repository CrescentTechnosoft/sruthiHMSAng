import { TestBed } from '@angular/core/testing';

import { OPRegService } from './opreg.service';

describe('OPRegService', () => {
  let service: OPRegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OPRegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
