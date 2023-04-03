/**
 * @description Módulo da configuração do usuário
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguserService } from './configuser.service';
import { ConfigUserRoutingModule } from '../routes';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule, NotificacaoModule, SpinnerModule, LanguageTranslationModule, ConfirmacaoService, ConfirmacaoComponent, ConfirmacaoModule } from '../shared';
import { ConfiguserComponent } from './configuser.component';
import { MatInputModule, MatSliderModule, MatExpansionModule, MatSlideToggleModule } from '@angular/material';



@NgModule({
  declarations: [ConfiguserComponent],
  exports: [ConfiguserComponent],
  providers: [ConfiguserService, NgxSpinnerService, ConfirmacaoService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    ConfigUserRoutingModule,
    PageHeaderModule,
    NotificacaoModule,
    SpinnerModule,
    LanguageTranslationModule,
    MatSliderModule,
    MatInputModule,
    MatExpansionModule,
    ReactiveFormsModule,
    ConfirmacaoModule,
    MatSlideToggleModule
    

  ]
})
export class ConfiguserModule { }
