import { TestBed } from '@angular/core/testing';

import { RegEventService } from './regEvent.service';

describe('RegEventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegEventService = TestBed.get(RegEventService);
    expect(service).toBeTruthy();
  });
});
