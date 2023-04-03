import { TestBed } from '@angular/core/testing';

import { PesqchaveService } from './pesqchave.service';

describe('PesqchaveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PesqchaveService = TestBed.get(PesqchaveService);
    expect(service).toBeTruthy();
  });
});
