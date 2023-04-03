/**
 * @description Rota do log de eventos
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from '../principal/principal.component';
import { LogeventosComponent } from '../logeventos/logeventos.component';

const routes: Routes = [
    {

        path: '', component: PrincipalComponent,
        children: [
            {
                path: 'logeventos', component: LogeventosComponent
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
export class LogEventosRoutingModule { }