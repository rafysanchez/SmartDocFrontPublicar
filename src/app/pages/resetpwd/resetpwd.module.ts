/**
 * @description Módulo do reset de senha
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetpwdComponent } from './resetpwd.component';
import { ResetpwdService } from './resetpwd.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LanguageTranslationModule, SpinnerModule, NotificacaoModule } from '../shared';
import { NgxSpinnerService } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LanguageTranslationModule,
    SpinnerModule,
    ReactiveFormsModule,
    NotificacaoModule
  ],
  declarations: [ResetpwdComponent],
  providers: [ResetpwdService, NgxSpinnerService]
})
export class ResetpwdModule { }
