import { Routes, RouterModule } from '@angular/router';
import { DashboardAdmComponent } from '../dashboardAdm/dashboardAdm.component';
import { NgModule } from '@angular/core';
import { PrincipalComponent } from '../principal/principal.component';

/**
 * @description Rota do home
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
const routes: Routes = [
    {
        path: '', component: PrincipalComponent,
        children: [
            {
                path: 'dashboardAdm', component: DashboardAdmComponent
            },
            {
                path: 'dashboardAdm/:id', component: DashboardAdmComponent
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
export class DashboardAdmRoutingModule { }
