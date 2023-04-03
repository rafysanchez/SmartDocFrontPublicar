import { TestBed } from '@angular/core/testing';

import { DoccomplementarService } from './doccomplementar.service';

describe('DoccomplementarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoccomplementarService = TestBed.get(DoccomplementarService);
    expect(service).toBeTruthy();
  });
});
