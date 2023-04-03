/**
 * @description Rota dos usuário
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from '../principal/principal.component';
import { UsuarioComponent } from '../usuario/usuario.component';

const routes: Routes = [
    {

        path: '', component: PrincipalComponent,
        children: [
            {
                path: 'usuario', component: UsuarioComponent
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
export class UsuarioRoutingModule { }