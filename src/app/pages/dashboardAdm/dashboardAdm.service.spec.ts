import { TestBed } from '@angular/core/testing';

import { DashboardAdmService } from './dashboardAdm.service';

describe('dashboardAdmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardAdmService = TestBed.get(DashboardAdmService);
    expect(service).toBeTruthy();
  });
});
