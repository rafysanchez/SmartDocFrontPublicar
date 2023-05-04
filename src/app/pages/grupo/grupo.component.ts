import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { slideToTop } from 'src/app/router.animations';
import { GrupoService } from './grupo.service';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  LanguageTranslationModule, NotificacaoComponent, ConfirmacaoService,
  SpinnerComponent, VerificarTpErro, TraduzirErro
} from '../shared';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GrupoEntity, LoginSapResponse } from '../entity';


@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss'],
  animations: [slideToTop()]
})
export class GrupoComponent implements OnInit {
  private Notificacao: NotificacaoComponent;
  private loading: SpinnerComponent;
  collapedSideBar: boolean;
  registerForm: FormGroup;
  User: LoginSapResponse;
  submitted = false;
  IdGroup: any;
  @ViewChild('Name', { static: true }) nameField: ElementRef;

  constructor(private gruposervice: GrupoService, private Notifi: NotifierService,
              private spinner: NgxSpinnerService, private translate: LanguageTranslationModule,
              private router: Router, private confirmationDialogService: ConfirmacaoService,
              private Activatedroute: ActivatedRoute) {

    this.Notificacao = new NotificacaoComponent(Notifi);
    this.User = JSON.parse(localStorage.getItem('User'));
    this.loading = new SpinnerComponent(spinner);

    this.IdGroup = this.Activatedroute.snapshot.queryParamMap.get('id') || 0;
  }

  ngOnInit() {
    this.submitted = false;
    this.nameField.nativeElement.focus();
    this.registerForm = new FormGroup({
      Name: new FormControl('', [
        Validators.required
      ]),
      Description: new FormControl(),
      Active: new FormControl(true)
    });

    if (this.IdGroup > 0) {
      this.RetDadosGroup();
    }

  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

  Voltar(): void {
    /*     this.router.navigate(["principal/grupos"], {
          history: true,
          transition: {
           name: 'slideTop',
           duration: 800,
           curve: 'spring'
           },
           animated: true
         }); */
    this.router.navigate(['principal/grupos']);
  }

  RetDadosGroup(): void {
    this.loading.Mostrar();
    let Grupo: GrupoEntity = new GrupoEntity();
    Grupo.Id = this.IdGroup;
    Grupo.Token = this.User.Token;
    Grupo.Branch = this.User.Branch;

    this.gruposervice.GetById(Grupo).subscribe((data) => {
      this.loading.Fechar();
      if (data != null) {
        Grupo = data;
        this.registerForm.controls.Name.setValue(Grupo.Name);
        this.registerForm.controls.Description.setValue(Grupo.Description);
        this.registerForm.controls.Active.setValue(Grupo.Active);
      } else {
        this.Notificacao.showNotification('info', TraduzirErro('MsgDadosErro', this.translate));
      }
    },
      (err: HttpErrorResponse) => {
        this.loading.Fechar();
        VerificarTpErro(this.router, err.error.ExceptionMessage, this.Notificacao, this.translate);
      });
  }

  onSubmit() {
    this.submitted = true;
    let Grupo: GrupoEntity;
    if (!this.registerForm.valid) { return; }
    Grupo = this.registerForm.value;
    Grupo.Branch = this.User.Branch;
    Grupo.Id = this.IdGroup;
    Grupo.Token = this.User.Token;

    this.confirmationDialogService.confirm('TitlePopSalvar', 'MsgSalvar')
      .then((confirmed) => {
        if (confirmed) {
          this.loading.Mostrar();
          this.gruposervice.Save(Grupo).subscribe((data) => {
            this.loading.Fechar();
            if (data != null) {
              if (Grupo.Id <= 0) {
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
