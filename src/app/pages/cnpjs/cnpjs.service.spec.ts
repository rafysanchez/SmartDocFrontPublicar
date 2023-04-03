import { TestBed } from '@angular/core/testing';

import { CnpjsService } from './cnpjs.service';

describe('CnpjsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CnpjsService = TestBed.get(CnpjsService);
    expect(service).toBeTruthy();
  });
});
