/**
 * @description Módulo de popup de confirmação
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmacaoComponent } from './confirmacao.component';
import { ConfirmacaoService } from './confirmacao.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguageTranslationModule } from '../language-translation.module';



@NgModule({
  declarations: [ConfirmacaoComponent],
  providers:[ConfirmacaoService],
  exports: [ConfirmacaoComponent],
  imports: [
    CommonModule,
    NgbModule,
    LanguageTranslationModule
  ]
})
export class ConfirmacaoModule { }
