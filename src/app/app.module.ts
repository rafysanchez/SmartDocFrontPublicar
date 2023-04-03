/**
 * @description Módulo comum da aplicação
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguageTranslationModule, AuthGuard, SpinnerModule, NotificacaoModule,
        PageHeaderModule, ConfirmacaoModule, ConfirmacaoComponent, ErrosGerais,
        NotificacaoComponent } from './pages/shared';
import { NotifierModule } from 'angular-notifier';
import { BnNgIdleService } from 'bn-ng-idle';
import { LoginModule } from './pages/login/login.module';
import { ModpwdModule } from './pages/modpwd/modpwd.module';
import { ResetpwdModule } from './pages/resetpwd/resetpwd.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoaderInterceptor } from './pages/shared/intercept/intercept-http.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LanguageTranslationModule,
    NgbDropdownModule,
    NgbCarouselModule,
    NotifierModule,
    SpinnerModule,
    NotificacaoModule,
    PageHeaderModule,
    LanguageTranslationModule,
    ConfirmacaoModule,
    LoginModule,
    ModpwdModule,
    ResetpwdModule,
    OrderModule,
    NgxPaginationModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    [NotificacaoComponent, { provide: ErrorHandler, useClass: ErrosGerais }],
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    Title,
    AuthGuard,
    BnNgIdleService
  ],
  entryComponents: [ConfirmacaoComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
