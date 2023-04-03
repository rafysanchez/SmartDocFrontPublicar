import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrincipalComponent } from '../principal/principal.component';
import { ConfiguserComponent } from '../configuser/configuser.component';

/**
 * @description Rota da configuração do usuário
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
const routes: Routes = [
    {
        path: '', component: PrincipalComponent,
        children: [
            {
                path: 'configuser', component: ConfiguserComponent
                
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
export class ConfigUserRoutingModule { }