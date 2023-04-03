import { DashboardAdmComponent } from './../dashboardAdm/dashboardAdm.component';
/**
 * @description Módulo com componente principal apos logon
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal.component';
// tslint:disable-next-line: max-line-length
import { MenuComponent, CabecalhoComponent, StatModule, ConfirmacaoModule, GridModule, MaterialModule, SpinnerModule, NotificacaoModule } from '../shared';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from '../routes';
import { NgbCarouselModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { HomeModule } from '../home/home.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { ConfiguserModule } from '../configuser/configuser.module';
import { GruposModule } from '../grupos/grupos.module';
import { GrupoModule } from '../grupo/grupo.module';
import { NgxSpinnerService } from 'ngx-spinner';
import { CnpjsModule } from '../cnpjs/cnpjs.module';
import { CnpjModule } from '../cnpj/cnpj.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { EmailsModule } from '../emails/emails.module';
import { EmailModule } from '../email/email.module';
import { PesqchaveModule } from '../pesqchave/pesqchave.module';
import { DocumentosModule } from '../documentos/documentos.module';
import { DoccomplementarModule } from '../doccomplementar/doccomplementar.module';
import { ExportacoesModule } from '../exportacoes/exportacoes.module';
import { ExportacaoModule } from '../exportacao/exportacao.module';
import { LogeventosModule } from '../logeventos/logeventos.module';
import { IntMailModule } from '../intmail/intmail.module';
import { EmailErrorModule } from '../emailerror/emailerror.module';
import { DashboardAdmModule } from '../dashboardAdm/dashboardAdm.module';

@NgModule({
  declarations: [
    PrincipalComponent,
    MenuComponent,
    CabecalhoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    NgbCarouselModule,
    NgbDropdownModule,
    StatModule,
    TranslateModule,
    HomeModule,
    DashboardModule,
    ConfiguserModule,
    GruposModule,
    GrupoModule,
    ConfirmacaoModule,
    GridModule,
    MaterialModule,
    SpinnerModule,
    NotificacaoModule,
    CnpjsModule,
    CnpjModule,
    UsuariosModule,
    UsuarioModule,
    EmailsModule,
    EmailModule,
    PesqchaveModule,
    DocumentosModule,
    DoccomplementarModule,
    ExportacoesModule,
    ExportacaoModule,
    LogeventosModule,
    IntMailModule,
    EmailErrorModule,
    DashboardAdmModule
  ],
  exports: [PrincipalComponent],
  providers: [NotifierService, NgxSpinnerService]
})
export class PrincipalModule { }
