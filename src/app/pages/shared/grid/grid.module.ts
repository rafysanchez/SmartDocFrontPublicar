import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { GridComponent } from './grid.component';
import { LanguageTranslationModule } from '../language-translation.module';
import { FormsModule } from '@angular/forms';
import { ImageRendererComponent } from './componentes/imagem.component';
import { MatTooltipModule } from '@angular/material';
import { CheckboxRenderComponent } from './componentes/checkbox.component';

@NgModule({
  declarations: [GridComponent, ImageRendererComponent, CheckboxRenderComponent],
  exports: [GridComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    LanguageTranslationModule,
    MatTooltipModule,
    AgGridModule.withComponents([ImageRendererComponent, CheckboxRenderComponent])
  ]
})
export class GridModule { }
