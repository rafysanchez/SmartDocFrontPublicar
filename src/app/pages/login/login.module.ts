/**
 * @description Módulo de login
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LanguageTranslationModule, NotificacaoModule, NotificacaoComponent } from '../shared';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerModule } from '../shared/spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LanguageTranslationModule,
    NotificacaoModule,
    SpinnerModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [LoginComponent],
  exports: [NotificacaoComponent],
  providers: [LoginService, NgxSpinnerService]
})
export class LoginModule { }
