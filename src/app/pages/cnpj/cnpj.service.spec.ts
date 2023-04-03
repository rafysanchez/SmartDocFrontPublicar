import { TestBed } from '@angular/core/testing';

import { CnpjService } from './cnpj.service';

describe('CnpjService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CnpjService = TestBed.get(CnpjService);
    expect(service).toBeTruthy();
  });
});
