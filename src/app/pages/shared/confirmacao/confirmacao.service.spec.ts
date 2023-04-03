import { TestBed } from '@angular/core/testing';

import { ConfirmacaoService } from './confirmacao.service';

describe('ConfirmacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfirmacaoService = TestBed.get(ConfirmacaoService);
    expect(service).toBeTruthy();
  });
});
