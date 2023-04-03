/**
 * @description Rota do principal
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PrincipalComponent } from '../principal/principal.component';
import { ConfiguserComponent } from '../configuser/configuser.component';
import { GruposComponent } from '../grupos/grupos.component';
import { CnpjsComponent } from '../cnpjs/cnpjs.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { EmailsComponent } from '../emails/emails.component';
import { PesqchaveComponent } from '../pesqchave/pesqchave.component';
import { ExportacoesComponent } from '../exportacoes/exportacoes.component';
import { IntmailComponent } from '../intmail/intmail.component';
import { DashboardAdmComponent} from '../dashboardAdm/dashboardAdm.component';

const routes: Routes = [
    {
        path: '', component: PrincipalComponent,
        children: [
            {
                path: 'dashboard/:id', component: DashboardComponent
            },
            {
                path: 'configuser', component: ConfiguserComponent
            },
            {
                path: 'grupos', component: GruposComponent
            },
            {
                path: 'usuarios', component: UsuariosComponent
            },
            {
                path: 'home', component: HomeComponent
            },
            {
                path: 'cnpjs', component: CnpjsComponent
            },
            {
                path: 'emails', component: EmailsComponent
            },
            {
                path: 'pesqchave', component: PesqchaveComponent
            },
            {
                path: 'exportacoes', component: ExportacoesComponent
            },
            {
                path: 'intmail', component: IntmailComponent
            },
            {
              path: 'dashboardAdm', component: DashboardAdmComponent
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
export class PrincipalRoutingModule { }
