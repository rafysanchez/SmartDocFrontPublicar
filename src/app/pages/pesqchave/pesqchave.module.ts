/**
 * @description Módulo de pesquisa de chave
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  PageHeaderModule, NotificacaoModule, SpinnerModule, LanguageTranslationModule, ConfirmacaoModule, GridModule, MaterialModule } from '../shared';
import { NgxSpinnerService } from 'ngx-spinner';
import { PesqChaveRoutingModule } from '../routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PesqchaveComponent } from './pesqchave.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  declarations: [PesqchaveComponent],
  exports: [PesqchaveComponent],
  providers: [PesqchaveComponent, NgxSpinnerService],
  imports: [
    CommonModule,
    PesqChaveRoutingModule,
    FormsModule,
    PageHeaderModule,
    NotificacaoModule,
    SpinnerModule,
    LanguageTranslationModule,
    ConfirmacaoModule,
    ReactiveFormsModule,
    GridModule,
    MaterialModule,
    NgxExtendedPdfViewerModule
  ]
})
export class PesqchaveModule { }
