import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrincipalComponent } from '../principal/principal.component';
import { CnpjsComponent } from '../cnpjs/cnpjs.component';
import { CnpjComponent } from '../cnpj/cnpj.component';

/**
 * @description Rota do cadastro de cnpjs
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
const routes: Routes = [
    {
        path: '', component: PrincipalComponent,
        children: [
            {
                path: 'cnpj', component: CnpjComponent
            },
            {
                path: 'cnpjs', component: CnpjsComponent
                
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
export class CnpjsRoutingModule { }