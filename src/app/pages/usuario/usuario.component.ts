import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageTranslationModule, ConfirmacaoService, NotificacaoComponent,
  SpinnerComponent, MyErrorStateMatcher, VerificarTpErro, TraduzirErro } from '../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginSapResponse, GrupoEntity, FuncionalidadesEntity, ManifestacoesEntity, UserEntity, UserSapResponseEntity } from '../entity';
import { slideToTop } from 'src/app/router.animations';
import { MatOption } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { RequestUser } from '../entity/RequestUser';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  animations: [slideToTop()]
})
export class UsuarioComponent implements OnInit {
  private Notificacao: NotificacaoComponent;
  private loading: SpinnerComponent;
  collapedSideBar: boolean;
  User: LoginSapResponse;
  registerForm: FormGroup;
  submitted = false;
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  Grupos: GrupoEntity[];
  Acessos: FuncionalidadesEntity[];
  Manifestacoes: ManifestacoesEntity[];
  IdUsuario: any;

  @ViewChild('Email', { static: true }) nameField: ElementRef;
  @ViewChild('allSelected', { static: false }) private allSelected: MatOption;
  @ViewChild('allAcesso', { static: false }) private allAcesso: MatOption;
  @ViewChild('allManifestacoes', { static: false }) private allManifestacoes: MatOption;

  constructor(private usuarioservice: UsuarioService, private Notifi: NotifierService,
              private spinner: NgxSpinnerService, private translate: LanguageTranslationModule,
              private Activatedroute: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder, private confirmationDialogService: ConfirmacaoService) {

    this.Notificacao = new NotificacaoComponent(Notifi);
    this.User = JSON.parse(localStorage.getItem('User'));
    this.loading = new SpinnerComponent(spinner);
    this.IdUsuario = this.Activatedroute.snapshot.queryParamMap.get('id') || 0;
  }

  ngOnInit() {
    this.nameField.nativeElement.focus();
    this.registerForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Name: ['', Validators.required],
      Description: [''],
      Active: [true, Validators.required],
      Groups: [Array<GrupoEntity>(), Validators.required],
      Funcoes: [Array<FuncionalidadesEntity>(), Validators.required],
      Manifestacoes: [Array<ManifestacoesEntity>()],
    });

    if (this.IdUsuario > 0) {
      this.registerForm.controls.Email.disable();

    }
    this.ChamarFuncoes();



  }
  get f() { return this.registerForm.controls; }

  ChamarFuncoes() {
    const Grupo: GrupoEntity = new GrupoEntity();
    Grupo.Branch = this.User.Branch;
    Grupo.Active = true;
    Grupo.Token = this.User.Token;
    // tslint:disable-next-line:max-line-length
    const Grupos = this.usuarioservice.RetGrupos(Grupo).pipe(catchError(error => of(VerificarTpErro(this.router, error.error.ExceptionMessage, this.Notificacao, this.translate))));
    // tslint:disable-next-line:max-line-length
    const Manifestacoes = this.usuarioservice.RetManifestacoes(this.User.Token).pipe(catchError(error => of(VerificarTpErro(this.router, error.error.ExceptionMessage, this.Notificacao, this.translate))));
    // tslint:disable-next-line:max-line-length
    const Acessos = this.usuarioservice.RetAcessos(this.User.Token).pipe(catchError(error => of(VerificarTpErro(this.router, error.error.ExceptionMessage, this.Notificacao, this.translate))));

    const usuario = new RequestUser();
    usuario.Token = this.User.Token;
    usuario.Branch = this.User.Branch;
    usuario.Id = parseInt(this.IdUsuario, 10) ;
    // tslint:disable-next-line:no-debugger
    debugger;
    // tslisnt:disable-next-line:max-line-length
    const UserAlt = this.usuarioservice.GetUsuarioById(usuario)
    .pipe(catchError(error => of(VerificarTpErro(this.router, error.error.ExceptionMessage, this.Notificacao, this.translate))));

    forkJoin([Grupos, Manifestacoes, Acessos, UserAlt]).subscribe(results => {
      this.Grupos = results[0];
      this.Manifestacoes = results[1];
      this.Acessos = results[2];
      const User: UserEntity = results[3];

      if (User != null) {
        if (User.Admin) {
          this.registerForm.controls.Groups.setValidators(null);
        }
        this.registerForm.controls.Email.setValue(User.Email);
        this.registerForm.controls.Name.setValue(User.Name);
        this.registerForm.controls.Description.setValue(User.Description);
        this.registerForm.controls.Active.setValue(User.Active);
        this.registerForm.controls.Groups.setValue(this.Grupos.filter(obj => User.Groups.map(item => item.Id).includes(obj.Id)));
        this.registerForm.controls.Funcoes.setValue(this.Acessos.filter(obj => User.Funcoes.map(item => item.Id).includes(obj.Id)));
        this.registerForm.controls.Manifestacoes.setValue(this.Manifestacoes.filter(obj => User.Manifestacoes.map(item => item.Id)
        .includes(obj.Id)));


      }
    });

  }


  tosslePerOne(all: any) {
    if (this.allSelected.selected) {
      this.allSelected.deselect();
      return false;
    }
    if (this.registerForm.controls.Groups.value.length === this.Grupos.length) {
      this.allSelected.select();
    }

  }

  SelAcesso(all: any) {
    if (this.allAcesso.selected) {
      this.allAcesso.deselect();
      return false;
    }
    if (this.registerForm.controls.Funcoes.value.length === this.Acessos.length) {
      this.allAcesso.select();
    }

  }

  SelTodosAcessos() {
    if (this.allAcesso.selected) {
      this.registerForm.controls.Funcoes
        .patchValue([...this.Acessos.map(item => item), 0]);
    } else {
      this.registerForm.controls.Funcoes.patchValue([]);
    }
  }

  SelMani(all: any) {
    if (this.allManifestacoes.selected) {
      this.allManifestacoes.deselect();
      return false;
    }
    if (this.registerForm.controls.Manifestacoes.value.length === this.Manifestacoes.length) {
      this.allManifestacoes.select();
    }

  }

  SelTodosMani() {
    if (this.allManifestacoes.selected) {
      this.registerForm.controls.Manifestacoes
        .patchValue([...this.Manifestacoes.map(item => item), 0]);
    } else {
      this.registerForm.controls.Manifestacoes.patchValue([]);
    }
  }

  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.registerForm.controls.Groups
        .patchValue([...this.Grupos.map(item => item), 0]);
    } else {
      this.registerForm.controls.Groups.patchValue([]);
    }
  }

  receiveCollapsed($event: boolean) {
    this.collapedSideBar = $event;
  }

  Voltar(): void {
    this.router.navigate(['principal/usuarios']);
  }
  onSubmit() {
    this.submitted = true;
    if (!this.registerForm.valid) { return; }
    const User: UserEntity = this.registerForm.value;
    User.Email = this.registerForm.controls.Email.value;
    User.Branch = this.User.Branch;
    User.Id = this.IdUsuario;
    User.Token = this.User.Token;
    this.confirmationDialogService.confirm('TitlePopSalvar', 'MsgSalvar')
      .then((confirmed) => {
        if (confirmed) {
          this.loading.Mostrar();
          this.usuarioservice.Save(User).subscribe((data) => {
            this.loading.Fechar();
            const UserRet: UserSapResponseEntity = data;
            if (UserRet != null) {
              if (!UserRet.SAPResponse.CanLogIn) {
                this.Notificacao.showNotification('warning', TraduzirErro(UserRet.SAPResponse.Message, this.translate));
                return;
              }

              if (UserRet.User.Id <= 0) {
                this.ngOnInit();
                this.Notificacao.showNotification('info', TraduzirErro('MsgDadosSalvos', this.translate));
              } else {
                this.Voltar();
              }
            } else {
              this.Notificacao.showNotification('info', TraduzirErro('MsgDadosErro', this.translate));
            }
          },
            (err: HttpErrorResponse) => {
              this.loading.Fechar();
              VerificarTpErro(this.router, err.error.ExceptionMessage, this.Notificacao, this.translate);
            });

        }
      });
  }
}
