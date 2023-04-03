/**
 * @description Módulo de Exportacoes
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportacoesRoutingModule } from '../routes';
import { ExportacoesComponent } from './exportacoes.component';
import { GridComponent, ConfirmacaoService, PageHeaderModule, NotificacaoModule, SpinnerModule, LanguageTranslationModule, ConfirmacaoModule, GridModule, MaterialModule } from '../shared';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExportacoesService } from './exportacoes.service';



@NgModule({
  declarations: [ExportacoesComponent],
  exports: [ExportacoesComponent, GridComponent],
  providers: [ExportacoesService, NgxSpinnerService, ConfirmacaoService],
  imports: [
    CommonModule,
    ExportacoesRoutingModule,
    FormsModule,
    PageHeaderModule,
    NotificacaoModule,
    SpinnerModule,
    LanguageTranslationModule,
    ConfirmacaoModule,
    ReactiveFormsModule,
    GridModule,
    MaterialModule
  ]
})
export class ExportacoesModule { }
