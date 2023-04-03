/**
 * @description Módulo de Email
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailComponent } from './email.component';
import { GridComponent, ConfirmacaoService, PageHeaderModule, NotificacaoModule, SpinnerModule, LanguageTranslationModule, ConfirmacaoModule, GridModule, MaterialModule } from '../shared';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmailRoutingModule } from '../routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [EmailComponent],
  exports: [EmailComponent,GridComponent],
  providers: [EmailComponent, NgxSpinnerService, ConfirmacaoService],
  imports: [
    CommonModule,
    EmailRoutingModule,
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
export class EmailModule { }
