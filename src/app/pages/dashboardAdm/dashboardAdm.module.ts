import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardAdmComponent } from './dashboardAdm.component';
import { DashboardAdmRoutingModule } from '../routes';
import { PageHeaderModule, NotificacaoModule, SpinnerModule, LanguageTranslationModule } from '../shared';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardAdmService } from './dashboardAdm.service';

@NgModule({
  declarations: [DashboardAdmComponent],
  exports: [DashboardAdmComponent],
  providers: [DashboardAdmService, NgxSpinnerService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    DashboardAdmRoutingModule,
    PageHeaderModule,
    NotificacaoModule,
    SpinnerModule,
    LanguageTranslationModule
  ]
})

export class DashboardAdmModule {}
