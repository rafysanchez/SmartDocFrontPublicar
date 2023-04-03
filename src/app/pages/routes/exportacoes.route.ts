/**
 * @description Rota das exportações
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from '../principal/principal.component';
import { ExportacoesComponent } from '../exportacoes/exportacoes.component';

const routes: Routes = [
    {

        path: '', component: PrincipalComponent,
        children: [
            {
                path: 'exportacoes', component: ExportacoesComponent
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

export class ExportacoesRoutingModule { }
