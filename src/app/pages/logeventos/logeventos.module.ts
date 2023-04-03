/**
 * @description Módulo de Log de Eventos
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogeventosComponent } from './logeventos.component';
import { LogEventosRoutingModule } from '../routes/logeventos.route';
import { GridComponent, ConfirmacaoService, PageHeaderModule, NotificacaoModule, SpinnerModule, LanguageTranslationModule, ConfirmacaoModule, GridModule, MaterialModule } from '../shared';
import { LogeventosService } from './logeventos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LogeventosComponent],
  exports: [LogeventosComponent,GridComponent],
  providers: [LogeventosService, NgxSpinnerService, ConfirmacaoService],
  imports: [
    CommonModule,
    LogEventosRoutingModule,
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
export class LogeventosModule { }
