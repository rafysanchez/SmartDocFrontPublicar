/**
 * @description Módulo dos documentos complementares
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocComplementarRoutingModule } from '../routes';
import { DoccomplementarComponent } from './doccomplementar.component';
import { GridComponent, ConfirmacaoService, PageHeaderModule, NotificacaoModule,
        SpinnerModule, LanguageTranslationModule, ConfirmacaoModule, GridModule, MaterialModule,  XmlPipe } from '../shared';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { AgGridModule } from 'ag-grid-angular';
import { ImageRendererComponent, CheckboxRenderComponent } from '../shared/grid/componentes';

@NgModule({
  declarations: [DoccomplementarComponent, SnackbarComponent,  XmlPipe],
  exports: [DoccomplementarComponent, GridComponent ],
  providers: [DoccomplementarComponent, NgxSpinnerService, ConfirmacaoService],
  imports: [
    CommonModule,
    DocComplementarRoutingModule,
    FormsModule,
    PageHeaderModule,
    NotificacaoModule,
    SpinnerModule,
    LanguageTranslationModule,
    ConfirmacaoModule,
    ReactiveFormsModule,
    GridModule,
    MaterialModule,
    NgxMaskModule.forRoot(),
    NgxExtendedPdfViewerModule,
    AgGridModule.withComponents([ImageRendererComponent, CheckboxRenderComponent])
  ]
})
export class DoccomplementarModule { }
