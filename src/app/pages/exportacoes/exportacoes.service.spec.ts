import { TestBed } from '@angular/core/testing';

import { ExportacoesService } from './exportacoes.service';

describe('ExportacoesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExportacoesService = TestBed.get(ExportacoesService);
    expect(service).toBeTruthy();
  });
});
