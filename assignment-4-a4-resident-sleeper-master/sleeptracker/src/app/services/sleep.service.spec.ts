import { TestBed } from '@angular/core/testing';

import { SleepService } from './sleep.service';

describe('SleepService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SleepService = TestBed.get(SleepService);
    expect(service).toBeTruthy();
  });
});
