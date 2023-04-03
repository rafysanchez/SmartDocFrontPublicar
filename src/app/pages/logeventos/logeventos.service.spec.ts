import { TestBed } from '@angular/core/testing';

import { LogeventosService } from './logeventos.service';

describe('LogeventosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogeventosService = TestBed.get(LogeventosService);
    expect(service).toBeTruthy();
  });
});
