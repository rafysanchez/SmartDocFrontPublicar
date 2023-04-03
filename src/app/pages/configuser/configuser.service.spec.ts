import { TestBed } from '@angular/core/testing';

import { ConfiguserService } from './configuser.service';

describe('ConfiguserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfiguserService = TestBed.get(ConfiguserService);
    expect(service).toBeTruthy();
  });
});
