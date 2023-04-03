/**
 * @description Módulo de grupos
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GruposRoutingModule } from '../routes';
import { GruposComponent } from './grupos.component';
import { GruposService } from './grupos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmacaoService, PageHeaderModule, NotificacaoModule, SpinnerModule, LanguageTranslationModule, ConfirmacaoModule, GridModule, GridComponent, MaterialModule } from '../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [GruposComponent],
  exports: [GruposComponent,GridComponent],
  providers: [GruposService, NgxSpinnerService, ConfirmacaoService],
  imports: [
    CommonModule,
    GruposRoutingModule,
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
export class GruposModule { }
