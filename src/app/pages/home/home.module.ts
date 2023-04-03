/**
 * @description Módulo para o home
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {  StatModule, NotificacaoModule, SpinnerModule, PageHeaderModule } from '../shared';
import { HomeService } from './home.service';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from '../routes';
import { NgbCarouselModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';

@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [HomeService, NgxSpinnerService],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    NgbCarouselModule,
    NgbDropdownModule,
    StatModule,
    TranslateModule,
    NotificacaoModule,
    SpinnerModule,
    PageHeaderModule
  ]
})
export class HomeModule { }
