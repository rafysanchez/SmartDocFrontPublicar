/**
 * @description Rota dos documentos complementares
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrincipalComponent } from '../principal/principal.component';
import { DoccomplementarComponent } from '../doccomplementar/doccomplementar.component';


const routes: Routes = [
    {
        path: '', component: PrincipalComponent,
        children: [
            {
                path: 'doccomplementar', component: DoccomplementarComponent
            },
            {
                path: 'doccomplementar/:modelo/:dados/:Tipo', component: DoccomplementarComponent
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
export class DocComplementarRoutingModule { }
