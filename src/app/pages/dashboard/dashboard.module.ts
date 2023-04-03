import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from '../routes';
import { PageHeaderModule, NotificacaoModule, SpinnerModule, LanguageTranslationModule } from '../shared';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from './dashboard.service';

@NgModule({
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
  providers:[DashboardService,NgxSpinnerService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    PageHeaderModule,
    NotificacaoModule,
    SpinnerModule,
    LanguageTranslationModule
    
  ]
})
export class DashboardModule { 

  
}
