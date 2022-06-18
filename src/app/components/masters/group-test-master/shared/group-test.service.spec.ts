import { TestBed } from '@angular/core/testing';

import { GroupTestService } from './group-test.service';

describe('GroupTestService', () => {
  let service: GroupTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
