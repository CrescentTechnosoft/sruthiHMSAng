import { TestBed } from '@angular/core/testing';

import { CustomEncoderService } from './custom-encoder.service';

describe('CustomPostEncoderService', () => {
  let service: CustomEncoderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomEncoderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
