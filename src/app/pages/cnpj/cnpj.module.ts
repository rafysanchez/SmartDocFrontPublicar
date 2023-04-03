/**
 * @description Módulo do cadastro de cnpj
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CnpjComponent } from './cnpj.component';
import { GridComponent, ConfirmacaoService, PageHeaderModule, NotificacaoModule, SpinnerModule, LanguageTranslationModule, ConfirmacaoModule, GridModule, MaterialModule } from '../shared';
import { CnpjService } from './cnpj.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CnpjRoutingModule } from '../routes';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [CnpjComponent],
  exports: [CnpjComponent, GridComponent],
  providers: [CnpjService, NgxSpinnerService, ConfirmacaoService],
  imports: [
    CommonModule,
    PageHeaderModule,
    NotificacaoModule,
    SpinnerModule,
    LanguageTranslationModule,
    ConfirmacaoModule,
    ReactiveFormsModule,
    GridModule,
    MaterialModule,
    CnpjRoutingModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class CnpjModule { }
