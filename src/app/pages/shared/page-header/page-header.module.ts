/**
 * @description Módulo do cabeçalho de página
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './page-header.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, RouterModule, TranslateModule],
    declarations: [PageHeaderComponent],
    exports: [PageHeaderComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PageHeaderModule {}
