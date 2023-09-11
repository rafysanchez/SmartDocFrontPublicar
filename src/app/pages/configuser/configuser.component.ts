/**
 * @description Componente de configuração do usuário
 * @author Alexandre A jacobino
 * @since 1.0.0
 *
 */
import { Component, OnInit } from '@angular/core';
import { ConfiguserService } from './configuser.service';
import { NotificacaoComponent, SpinnerComponent, LanguageTranslationModule, ConfirmacaoService, TraduzirErro, VerificarTpErro } from '../shared';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { slideToTop } from 'src/app/router.animations';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSliderChange } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { UserEntity, LoginSapResponse } from '../entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuser',
  templateUrl: './configuser.component.html',
  styleUrls: ['./configuser.component.scss'],
  animations: [slideToTop()]
})
export class ConfiguserComponent implements OnInit {
  private Notificacao: NotificacaoComponent;
  private loading: SpinnerComponent;
  private User: LoginSapResponse;
  public reportId: string;
  collapedSideBar: boolean;
  registerForm: FormGroup;
  submitted = false;
  get f() { return this.registerForm.controls; }

  constructor(private confgiuserservice: ConfiguserService, private Notifi: NotifierService,
    private spinner: NgxSpinnerService, private translate: LanguageTranslationModule,
    private formBuilder: FormBuilder, private confirmationDialogService: ConfirmacaoService, private router: Router) {

    this.Notificacao = new NotificacaoComponent(Notifi);
    this.loading = new SpinnerComponent(spinner);
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      QtdDias: [''],
      InpDias: [''],
      SendEmail: ['']
    });
    this.User = JSON.parse(localStorage.getItem("User"));
    this.RetDadosUser();
  }

  SetValor(event: MatSliderChange) {
    this.registerForm.controls.InpDias.setValue(event.value);
  }
  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

  RetDadosUser() {
    this.confgiuserservice.RetDados(this.User.Token, this.User.UserLogged.Id).subscribe((data) => {
      let Usuario: UserEntity = data;
      this.registerForm.controls.QtdDias.setValue(Usuario.QtdDias);
      this.registerForm.controls.InpDias.setValue(Usuario.QtdDias);
      this.registerForm.controls.SendEmail.setValue(Usuario.SendEmail);

    },
      (err: HttpErrorResponse) => {
        this.Notificacao.showNotification("error", err.message);
      })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.registerForm.valid) { return; }
    let Usuario: UserEntity = this.registerForm.value;
    Usuario.Id = this.User.UserLogged.Id;
    Usuario.Branch = this.User.Branch ;
    
    this.confirmationDialogService.confirm('TitlePopSalvar', 'MsgSalvar')
      .then((confirmed) => {
        if (confirmed) {
          this.loading.Mostrar();
          this.confgiuserservice.SaveConfig(this.User.Token, Usuario).subscribe((data) => {
            this.loading.Fechar();
            if (data === true) {
              this.Notificacao.showNotification("info", TraduzirErro("MsgDadosSalvos", this.translate));
            }
            else {
              this.Notificacao.showNotification("info", TraduzirErro("MsgDadosErro", this.translate));
            }
          },
            (err: HttpErrorResponse) => {
              this.loading.Fechar();
              VerificarTpErro(this.router, err, this.Notificacao, this.translate);
            })
        }

      })
      .catch(() => this.loading.Fechar());
  }

}
