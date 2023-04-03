/**
 * @description Componente de mudança de senha
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Component, OnInit } from '@angular/core';
import { ModpwdService } from './modpwd.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { slideToTop } from 'src/app/router.animations';
import { MustMatch, NotificacaoComponent, SpinnerComponent } from '../shared';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginSapViewEntity, LoginSapResponse } from '../entity';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-modpwd',
  templateUrl: './modpwd.component.html',
  styleUrls: ['../login/login.component.scss'],
  animations: [slideToTop()]
})
export class ModpwdComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  private Notificacao: NotificacaoComponent;
  private User: LoginSapResponse;
  private loading: SpinnerComponent;

  get f() { return this.registerForm.controls; }

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private ModpwdService: ModpwdService, private router: Router, private Notifi: NotifierService,
              private formBuilder: FormBuilder, private spinner: NgxSpinnerService) {
    this.Notificacao = new NotificacaoComponent(Notifi);
    this.loading = new SpinnerComponent(spinner);
  }

  ngOnInit() {
    this.User = JSON.parse(localStorage.getItem('User'));

    this.registerForm = this.formBuilder.group({
      Login: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]],

    }, {
        validator: MustMatch('Password', 'ConfirmPassword')
      });

    // seta o nome do usuário na caixa
    this.registerForm.controls.Login.disable();
    // tslint:disable-next-line:max-line-length
    this.registerForm.controls.Login.setValue((this.User.UserLogged.Email === null ? this.User.UserLogged.Name : this.User.UserLogged.Email));
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.loading.Mostrar();
      const loginEntity: LoginSapViewEntity = new LoginSapViewEntity();
      loginEntity.Login = this.registerForm.controls.Login.value;
      loginEntity.Password = btoa(this.registerForm.controls.ConfirmPassword.value) ;
      loginEntity.MANDT = 'N';
      loginEntity.SYSID = 'U';

      this.ModpwdService.ResetPwd(loginEntity).subscribe((data) => {
        const UsuarioLogado: LoginSapResponse = data;
        if (UsuarioLogado.CanLogIn) {
          this.loading.Fechar();
          localStorage.setItem('User', JSON.stringify(UsuarioLogado));
          this.router.navigate(['principal/home']);
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

  Voltar(): void {
    this.router.navigate(['login']);

  }

}
