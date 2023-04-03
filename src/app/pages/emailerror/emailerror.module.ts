/**
 * @description Módulo de Log de Eventos
 * @author Delio Darwin
 * @since 1.0.0
 */
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailErrorComponent } from './emailerror.component';
import { EmailErrorRoutingModule } from '../routes/emailerror.route';
import { GridComponent, ConfirmacaoService, PageHeaderModule, NotificacaoModule, SpinnerModule, LanguageTranslationModule,
         ConfirmacaoModule, GridModule, MaterialModule } from '../shared';
import { EmailErrorService } from './emailerror.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [EmailErrorComponent],
  bootstrap: [EmailErrorComponent],
  exports: [EmailErrorComponent],
  providers: [EmailErrorService, NgxSpinnerService, ConfirmacaoService, {provide: LOCALE_ID, useValue: 'pt'}],
  imports: [
    CommonModule,
    EmailErrorRoutingModule,
    FormsModule,
    PageHeaderModule,
    NotificacaoModule,
    SpinnerModule,
    LanguageTranslationModule,
    ConfirmacaoModule,
    ReactiveFormsModule,
    GridModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    OrderModule,
    NgxPaginationModule
  ]
})
export class EmailErrorModule { }
