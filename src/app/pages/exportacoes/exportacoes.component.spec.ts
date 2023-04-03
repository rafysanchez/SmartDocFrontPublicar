import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportacoesComponent } from './exportacoes.component';

describe('ExportacoesComponent', () => {
  let component: ExportacoesComponent;
  let fixture: ComponentFixture<ExportacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
