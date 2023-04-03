import { TestBed } from '@angular/core/testing';

import { IntmailService } from './intmail.service';

describe('IntmailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntmailService = TestBed.get(IntmailService);
    expect(service).toBeTruthy();
  });
});
