import { TestBed } from '@angular/core/testing';

import { ExportacaoService } from './exportacao.service';

describe('ExportacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExportacaoService = TestBed.get(ExportacaoService);
    expect(service).toBeTruthy();
  });
});
