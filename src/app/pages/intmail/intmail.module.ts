/**
 * @description Módulo de Log de Eventos
 * @author Delio Darwin
 * @since 1.0.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntmailComponent } from './intmail.component';
import { IntMailRoutingModule } from '../routes/intmail.route';
import { GridComponent, ConfirmacaoService, PageHeaderModule, NotificacaoModule, SpinnerModule, LanguageTranslationModule,
         ConfirmacaoModule, GridModule, MaterialModule } from '../shared';
import { IntmailService } from './intmail.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [IntmailComponent],
  exports: [IntmailComponent, GridComponent],
  providers: [IntmailService, NgxSpinnerService, ConfirmacaoService],
  imports: [
    CommonModule,
    IntMailRoutingModule,
    FormsModule,
    PageHeaderModule,
    NotificacaoModule,
    SpinnerModule,
    LanguageTranslationModule,
    ConfirmacaoModule,
    ReactiveFormsModule,
    GridModule,
    MaterialModule,
    NgxMaskModule
  ]
})
export class IntMailModule { }
