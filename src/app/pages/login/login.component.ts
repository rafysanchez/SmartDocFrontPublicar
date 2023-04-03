import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginEntity } from '../entity';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { slideToTop } from 'src/app/router.animations';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginSapResponse } from '../entity/loginsapresponse.entity';
import { NotificacaoComponent, SpinnerComponent, LanguageTranslationModule, TraduzirErro } from '../shared';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [slideToTop()]
})


export class LoginComponent implements OnInit {

  /** @description Variavéis */
  registerForm: FormGroup;
  submitted = false;
  private Notificacao: NotificacaoComponent;
  private loading: SpinnerComponent;
  get f() { return this.registerForm.controls; }

  /**
   * 
   * @param loginService Parametro de Serviço de login
   * @param router  Parametro de rota
   * @param Notifi  Parametro de Notificação
   * @param formBuilder  Parametro de formulário
   * @param spinner Parametro de Carregamento de página
   */
  constructor(private loginService: LoginService, private router: Router, private Notifi: NotifierService,
    private formBuilder: FormBuilder, private spinner: NgxSpinnerService, private translate: LanguageTranslationModule) {
    this.Notificacao = new NotificacaoComponent(Notifi);
    this.loading = new SpinnerComponent(spinner);
  }

  ngOnInit() {
    localStorage.clear();

    this.registerForm = this.formBuilder.group({
      Login: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]]

    });
  }

  ResetPwd(): void {
    this.router.navigate(['resetpwd']);
  }

  TrocarLinguagem(Linguagem: string): void {
    this.translate.TrocarLinguagem(Linguagem);
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.loading.Mostrar();
      // const loginEntity: LoginEntity = this.registerForm.value;
      const loginEntity: LoginEntity = new LoginEntity();
      loginEntity.Login = this.f.Login.value;
      loginEntity.Password = btoa(this.f.Password.value);

      this.loginService.RequestLogin(loginEntity).subscribe((data) => {
        const UsuarioLogado: LoginSapResponse = data;
        localStorage.setItem('User', JSON.stringify(UsuarioLogado));
        localStorage.setItem('isLoggedIn', 'true');

        if (UsuarioLogado.NeedChangePassword) {
          this.loading.Fechar();
          this.router.navigate(['modpwd']);
          return;
        }

        if (UsuarioLogado.CanLogIn) {
          this.router.navigate(['principal/home']);
          this.loading.Fechar();
        } else {
          this.loading.Fechar();
          this.Notificacao.showNotification('info', TraduzirErro(UsuarioLogado.Message, this.translate));
        }
      },
        (err: HttpErrorResponse) => {
          this.loading.Fechar();
          this.Notificacao.showNotification('error', err.message);
        });
    } else {
      return;
    }
  };
}