import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrincipalComponent } from '../principal/principal.component';
import { CnpjComponent } from '../cnpj/cnpj.component';

/**
 * @description Rota do cadastro de cnpj
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
const routes: Routes = [
    {
        path: '', component: PrincipalComponent,
        children: [
            {
                path: 'cnpj/:id', component: CnpjComponent
                
            },
            {
                path: '', redirectTo: 'principal', pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CnpjRoutingModule { }