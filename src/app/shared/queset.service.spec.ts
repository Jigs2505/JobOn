import { TestBed } from '@angular/core/testing';

import { QueSetService } from './queset.service';

describe('QueSetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QueSetService = TestBed.get(QueSetService);
    expect(service).toBeTruthy();
  });
});
