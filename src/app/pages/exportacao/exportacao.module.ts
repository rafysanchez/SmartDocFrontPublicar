/**
 * @description Módulo de Exportacao
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportacaoComponent } from './exportacao.component';
import { GridComponent, ConfirmacaoService, PageHeaderModule, NotificacaoModule, SpinnerModule, LanguageTranslationModule, ConfirmacaoModule, GridModule, MaterialModule } from '../shared';
import { ExportacaoService } from './exportacao.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExportacaoRoutingModule } from '../routes';
import { NgxMaskModule } from 'ngx-mask';
import { LoaderInterceptor } from '../shared/intercept/intercept-http.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [ExportacaoComponent],
  exports: [ExportacaoComponent, GridComponent],
  providers: [ExportacaoService, NgxSpinnerService, ConfirmacaoService],
  imports: [
    CommonModule,
    ExportacaoRoutingModule,
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
export class ExportacaoModule { }
