/**
 * @description Módulo de grupo
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoComponent } from './grupo.component';
import {  GrupoRoutingModule } from '../routes';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmacaoService, PageHeaderModule, NotificacaoModule,
        SpinnerModule, LanguageTranslationModule, ConfirmacaoModule, GridModule, MaterialModule, NotificacaoComponent } from '../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GrupoService } from './grupo.service';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';

@NgModule({
  declarations: [GrupoComponent],
  providers: [GrupoService, NgxSpinnerService, ConfirmacaoService,
    [
      {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
    ]
  ],
  imports: [
    CommonModule,
    GrupoRoutingModule,
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
export class GrupoModule { }
