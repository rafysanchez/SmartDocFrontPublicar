/**
 * @description Rota da exportação
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from '../principal/principal.component';
import { ExportacaoComponent } from '../exportacao/exportacao.component';

const routes: Routes = [
    {

        path: '', component: PrincipalComponent,
        children: [
            {
                path: 'exportacao', component: ExportacaoComponent
            },
            {
                path: 'exportacao/:id', component: ExportacaoComponent
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
export class ExportacaoRoutingModule { }