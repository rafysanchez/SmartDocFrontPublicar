/**
 * @description Módulo de documentos
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentosComponent } from './documentos.component';
import { GridComponent, ConfirmacaoService, PageHeaderModule, NotificacaoModule,
  SpinnerModule, LanguageTranslationModule, ConfirmacaoModule, GridModule, MaterialModule } from '../shared';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocumentosRoutingModule } from '../routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { DocfiltroComponent } from './docfiltro/docfiltro.component';
import { DragdropComponent } from './dragdrop/dragdrop.component';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
import { ManifestacaoComponent } from './manifestacao/manifestacao.component';


@NgModule({
  declarations: [DocumentosComponent, DocfiltroComponent, DragdropComponent, ManifestacaoComponent],
  exports: [DocumentosComponent, GridComponent],
  providers: [DocumentosComponent, NgxSpinnerService, ConfirmacaoService],
  entryComponents: [DocfiltroComponent, DragdropComponent, SnackbarComponent, ManifestacaoComponent],
  imports: [
    CommonModule,
    DocumentosRoutingModule,
    FormsModule,
    PageHeaderModule,
    NotificacaoModule,
    SpinnerModule,
    LanguageTranslationModule,
    ConfirmacaoModule,
    ReactiveFormsModule,
    GridModule,
    MaterialModule,
    NgxMaskModule.forRoot()
  ]
})
export class DocumentosModule { }
