/**
 * @description Módulo da alteração de senha
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { ModpwdComponent } from './modpwd.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModpwdService } from './modpwd.service';
import { LanguageTranslationModule, SpinnerModule, NotificacaoModule } from '../shared';
import { NgxSpinnerService } from 'ngx-spinner';

@NgModule({
  declarations: [ModpwdComponent],
  providers: [ModpwdService, NgxSpinnerService],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LanguageTranslationModule,
    SpinnerModule,
    ReactiveFormsModule,
    NotificacaoModule
  ]
})
export class ModpwdModule { }
