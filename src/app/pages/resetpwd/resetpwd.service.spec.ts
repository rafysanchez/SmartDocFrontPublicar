import { TestBed } from '@angular/core/testing';

import { ResetpwdService } from './resetpwd.service';

describe('ResetpwdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResetpwdService = TestBed.get(ResetpwdService);
    expect(service).toBeTruthy();
  });
});
