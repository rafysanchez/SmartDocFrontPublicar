/**
 * @description Módulo de cnpj
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CnpjsComponent } from './cnpjs.component';
import { CnpjsService } from './cnpjs.service';
import { GridComponent, ConfirmacaoService, PageHeaderModule, NotificacaoModule, SpinnerModule, LanguageTranslationModule, ConfirmacaoModule, GridModule, MaterialModule } from '../shared';
import { NgxSpinnerService } from 'ngx-spinner';
import { CnpjRoutingModule, CnpjsRoutingModule } from '../routes';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CnpjsComponent],
  exports: [CnpjsComponent,GridComponent],
  providers: [CnpjsService, NgxSpinnerService, ConfirmacaoService],
  imports: [
    CommonModule,
    CnpjsRoutingModule,
    CnpjRoutingModule,
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
export class CnpjsModule { }
