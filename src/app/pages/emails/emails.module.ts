/**
 * @description Módulo de Emails
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailsComponent } from './emails.component';
import { GridComponent, ConfirmacaoService, PageHeaderModule, NotificacaoModule, SpinnerModule, LanguageTranslationModule, ConfirmacaoModule, GridModule, MaterialModule } from '../shared';
import { EmailsService } from './emails.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmailsRoutingModule } from '../routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EmailsComponent],
  exports: [EmailsComponent,GridComponent],
  providers: [EmailsComponent, NgxSpinnerService, ConfirmacaoService],
  imports: [
    CommonModule,
    EmailsRoutingModule,
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
export class EmailsModule { }
