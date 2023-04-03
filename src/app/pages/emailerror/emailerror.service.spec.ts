import { TestBed } from '@angular/core/testing';
import { EmailErrorService } from './emailerror.service';

describe('EmailErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailErrorService = TestBed.get(EmailErrorService);
    expect(service).toBeTruthy();
  });
});
