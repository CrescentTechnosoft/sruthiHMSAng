import { TestBed } from '@angular/core/testing';

import { KeyEventService } from './key-event.service';

describe('KeyEventService', () => {
  let service: KeyEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
