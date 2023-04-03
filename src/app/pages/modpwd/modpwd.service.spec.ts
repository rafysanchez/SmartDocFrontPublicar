import { TestBed } from '@angular/core/testing';
import { ModpwdService } from './modpwd.service';

describe('ModpwdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModpwdService = TestBed.get(ModpwdService);
    expect(service).toBeTruthy();
  });
});
