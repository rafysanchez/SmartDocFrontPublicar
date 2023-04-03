/**
 * @description Componente do reset de senha
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */
import { Component, OnInit } from '@angular/core';
import { ResetpwdService } from './resetpwd.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { slideToRight } from 'src/app/router.animations';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginSapViewEntity } from '../entity/loginsapview.entity';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificacaoComponent, SpinnerComponent, LanguageTranslationModule, TraduzirErro } from '../shared';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['../login/login.component.scss'],
  animations: [slideToRight()]
})
export class ResetpwdComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  private Notificacao: NotificacaoComponent;
  private loading: SpinnerComponent;

  get f() { return this.registerForm.controls; }

  constructor(private pwdService: ResetpwdService, private router: Router,
              private Notifi: NotifierService, private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private translate: LanguageTranslationModule) {
    this.Notificacao = new NotificacaoComponent(Notifi);
    this.loading = new SpinnerComponent(spinner);
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]

    });
  }


  Voltar(): void {
    this.router.navigate(['login']);

  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (!this.registerForm.invalid) {
      const entity: LoginSapViewEntity = new LoginSapViewEntity();
      entity.MANDT = 'R';
      entity.Login = this.registerForm.value.email;
      this.loading.Mostrar();
      this.pwdService.ResetPwd(entity).subscribe((data) => {
        if (data === 'Sucesso na operação') {
          this.Notificacao.showNotification('success', 'E-mail foi enviado com sucesso verifique sua caixa.');
        } else {
          this.loading.Fechar();
          this.Notificacao.showNotification('info', TraduzirErro(data.toString(), this.translate));
        }
      },
        (err: HttpErrorResponse) => {
          this.loading.Fechar();
          this.Notificacao.showNotification('error', err.message);
        });
    } else {
      return;
    }


  }

}
