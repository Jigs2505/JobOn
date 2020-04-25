import { TestBed } from '@angular/core/testing';

import { McqService } from './mcq.service';

describe('McqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: McqService = TestBed.get(McqService);
    expect(service).toBeTruthy();
  });
});
