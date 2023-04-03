/**
 * @description Rota dos emails
 * @author Delio Darwin
 * @since 1.0.0
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from '../principal/principal.component';
import { EmailErrorComponent } from '../emailerror/emailerror.component';

const routes: Routes = [
    {

        path: '', component: PrincipalComponent,
        children: [
            {
                path: 'emailerror', component: EmailErrorComponent
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

export class EmailErrorRoutingModule { }
