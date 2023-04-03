/**
 * @description Rota dos documentos
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrincipalComponent } from '../principal/principal.component';
import { DocumentosComponent } from '../documentos/documentos.component';


const routes: Routes = [
    {
        path: '', component: PrincipalComponent,
        children: [
            {
                path: 'documentos', component: DocumentosComponent
            },
            {
                path: 'documentos/:modelo/:Tipo', component: DocumentosComponent
            },
            {
                path: '', redirectTo: 'principal/home', pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocumentosRoutingModule { }
