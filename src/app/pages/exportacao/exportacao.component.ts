/**
 * @description Componente de exportacao
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */

import { Component, OnInit } from '@angular/core';
import { NotificacaoComponent, SpinnerComponent, LanguageTranslationModule,
  ConfirmacaoService, MyErrorStateMatcher, FuncoesGenericas, TraduzirErro, VerificarTpErro } from '../shared';
import { LoginSapResponse, ExportacaoEntity } from '../entity';
import { ExportacaoService } from './exportacao.service';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { slideToTop } from 'src/app/router.animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-exportacao',
  templateUrl: './exportacao.component.html',
  styleUrls: ['./exportacao.component.scss'],
  animations: [slideToTop()]
})
export class ExportacaoComponent implements OnInit {
  private Notificacao: NotificacaoComponent;
  private loading: SpinnerComponent;
  User: LoginSapResponse;
  registerForm: FormGroup;
  get f() { return this.registerForm.controls; }
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  IdExportacao;


  constructor(private exportacaoservice: ExportacaoService, private Notifi: NotifierService,
              private spinner: NgxSpinnerService, private translate: LanguageTranslationModule,
              private router: Router, private confirmationDialogService: ConfirmacaoService,
              private formBuilder: FormBuilder, private Activatedroute: ActivatedRoute) {

    this.Notificacao = new NotificacaoComponent(this.Notifi);
    this.User = JSON.parse(localStorage.getItem('User'));
    this.loading = new SpinnerComponent(this.spinner);
    this.IdExportacao = this.Activatedroute.snapshot.queryParamMap.get('id') || 0;

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      documentType: ['', [Validators.required]],
      TPNF: ['', [Validators.required]],
      NmExport: ['', [Validators.required]],
      NNFstart: [''],
      DTEMIstart: ['', FuncoesGenericas.ValidDate],
      CNPJEstart: ['', FuncoesGenericas.CnpjValido],
      CNPJDstart: ['', FuncoesGenericas.CnpjValido],
      NNFend: [''],
      DTEMIend: ['', FuncoesGenericas.ValidDate],
      CNPJEend: ['', FuncoesGenericas.CnpjValido],
      CNPJDend: ['', FuncoesGenericas.CnpjValido],
      Branch: ['']
    });

    // verifica se foi chamado para alteração de dados
    if (this.IdExportacao > 0) {
      this.registerForm.controls.documentType.disable();
      this.registerForm.controls.TPNF.disable();
      this.ChamarDados();
    }
  }

  Voltar(): void {
    this.router.navigate(['principal/exportacoes']);
  }

  ChamarDados() {
    this.loading.Mostrar();
    const Dados: ExportacaoEntity = new ExportacaoEntity();
    Dados.Id = this.IdExportacao;
    Dados.Token = this.User.Token;
    Dados.Branch = this.User.Branch;
    this.exportacaoservice.RetExport(Dados).subscribe((data) => {
      this.loading.Fechar();
      if (data != null) {
        const DadosRet: ExportacaoEntity = data;
        const Filtros = JSON.parse(DadosRet.DsFilter);

        this.registerForm.controls.documentType.setValue(DadosRet.DocType);
        this.registerForm.controls.NmExport.setValue(DadosRet.NmExport);
        this.registerForm.controls.TPNF.setValue(Filtros.TPNF);
        this.registerForm.controls.NNFstart.setValue(Filtros.NNFstart);
        this.registerForm.controls.DTEMIstart.setValue(Filtros.DTEMIstart);
        this.registerForm.controls.CNPJEstart.setValue(Filtros.CNPJEstart);
        this.registerForm.controls.CNPJDstart.setValue(Filtros.CNPJDstart);
        this.registerForm.controls.NNFend.setValue(Filtros.NNFend);
        this.registerForm.controls.DTEMIend.setValue(Filtros.DTEMIend);
        this.registerForm.controls.CNPJEend.setValue(Filtros.CNPJEend);
        this.registerForm.controls.CNPJDend.setValue(Filtros.CNPJDend);

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
    if (!this.registerForm.valid) {
      this.Notificacao.showNotification('warning', TraduzirErro('MsgDadosInvalidos', this.translate));
      return;
    }

    if (this.registerForm.controls.NNFstart.value !== '' && this.registerForm.controls.NNFend.value === '') {
      if (this.registerForm.controls.documentType.value === 'CT-e') {
        this.Notificacao.showNotification('warning', TraduzirErro('MsgFiltroConhAte', this.translate));
      } else {
        this.Notificacao.showNotification('warning', TraduzirErro('MsgFiltroNfpAte', this.translate));
      }
      return;

    }

    if (this.registerForm.controls.NNFstart.value === '' && this.registerForm.controls.NNFend.value !== '') {
      if (this.registerForm.controls.documentType.value === 'CT-e') {
        this.Notificacao.showNotification('warning', TraduzirErro('MsgFiltroConhDe', this.translate));
      } else {
        this.Notificacao.showNotification('warning', TraduzirErro('MsgFiltroNfDe', this.translate));
      }
      return;
    }

    if (this.registerForm.controls.DTEMIstart.value !== '' && this.registerForm.controls.DTEMIend.value === '') {
      this.Notificacao.showNotification('warning', TraduzirErro('MsgFiltroDtEmiAte', this.translate));
      return;
    }

    if (this.registerForm.controls.DTEMIstart.value === '' && this.registerForm.controls.DTEMIend.value !== '') {
      this.Notificacao.showNotification('warning', TraduzirErro('MsgFiltroDtEmiDe', this.translate));
      return;
    }


    if (this.registerForm.controls.CNPJEstart.value !== '' && this.registerForm.controls.CNPJEend.value === '') {
      this.Notificacao.showNotification('warning', TraduzirErro('MsgFiltroCnpjEmiAte', this.translate));
      return;
    }

    if (this.registerForm.controls.CNPJEstart.value === '' && this.registerForm.controls.CNPJEend.value !== '') {
      this.Notificacao.showNotification('warning', TraduzirErro('MsgFiltroCnpjEmiDe', this.translate));
      return;
    }

    if (this.registerForm.controls.CNPJDstart.value !== '' && this.registerForm.controls.CNPJDend.value === '') {
      this.Notificacao.showNotification('warning', TraduzirErro('MsgFiltroCnpjDestAte', this.translate));
      return;
    }

    if (this.registerForm.controls.CNPJDstart.value === '' && this.registerForm.controls.CNPJDend.value !== '') {
      this.Notificacao.showNotification('warning', TraduzirErro('MsgFiltroCnpjDestDe', this.translate));
      return;
    }

    /**
     * Valida se foi preenchido pelo menos um filtro
     */
    let Validado = false;
    const Controles: any = this.registerForm;
    const Dados = Object.getOwnPropertyNames(this.registerForm.value).forEach(function(val, idx, array) {
      switch (val) {
        case 'documentType':
        case 'TPNF':
        case 'NmExport':
          break;
        default:
          if (Controles.controls[val].value !== '') {
            Validado = true;
          }
          break;
      }
    });

    if (!Validado) {
      this.Notificacao.showNotification('warning', TraduzirErro('MsgValExport', this.translate));
      return;
    }
    // Prepara os dados para envio e exlui a propriedade de nome
    const Dadosenviar = this.registerForm.value;
    delete Dadosenviar.NmExport;

    if (Dadosenviar.NNFstart === '' || Dadosenviar.NNFstart === undefined) {
      delete Dadosenviar.NNFstart;
    }

    if (Dadosenviar.NNFend === '' || Dadosenviar.NNFend === undefined) {
      delete Dadosenviar.NNFend;
    }

    if (Dadosenviar.CNPJDstart === '' || Dadosenviar.CNPJDstart === undefined) {
      delete Dadosenviar.CNPJDstart;
    }

    if (Dadosenviar.CNPJDend === '' || Dadosenviar.CNPJDend === undefined) {
      delete Dadosenviar.CNPJDend;
    }

    if (Dadosenviar.CNPJEstart === '' || Dadosenviar.CNPJEstart === undefined) {
      delete Dadosenviar.CNPJEstart;
    }

    if (Dadosenviar.CNPJEend === '' || Dadosenviar.CNPJEend === undefined) {
      delete Dadosenviar.CNPJEend;
    }

    if (Dadosenviar.DTEMIstart === '' || Dadosenviar.DTEMIstart === undefined) {
      delete Dadosenviar.DTEMIstart;
    }

    if (Dadosenviar.DTEMIend === '' || Dadosenviar.DTEMIend === undefined) {
      delete Dadosenviar.DTEMIend;
    }

    Dadosenviar.Branch = this.User.Branch;
    Dadosenviar.documentType = this.registerForm.controls.documentType.value;
    Dadosenviar.TPNF = this.registerForm.controls.TPNF.value;

    const Enviar: ExportacaoEntity = new ExportacaoEntity();
    Enviar.DsFilter = JSON.stringify(Dadosenviar);
    Enviar.UserId = this.User.UserLogged.Id;
    Enviar.Branch = this.User.Branch;
    Enviar.Generate = false;
    Enviar.NmExport = this.registerForm.controls.NmExport.value;
    Enviar.DocType = this.registerForm.controls.documentType.value;
    Enviar.Id = this.IdExportacao;

    this.confirmationDialogService.confirm('TitlePopSalvar', 'MsgSalvar')
      .then((confirmed) => {
        if (confirmed) {
          // this.loading.Mostrar();
          this.exportacaoservice.Save(this.User.Token, Enviar).subscribe((data) => {
            // this.loading.Fechar();
            if (data != null) {
              if (this.IdExportacao <= 0) {
                this.ngOnInit();
                this.Notificacao.showNotification('info', TraduzirErro('MsgDadosSalvos', this.translate));
              } else {
                this.Voltar();
              }

            }
          },
            (err: HttpErrorResponse) => {
              // this.loading.Fechar();
              VerificarTpErro(this.router, err.error.Message, this.Notificacao, this.translate);
              this.Notificacao.showNotification("error", err.error.ExceptionMessage);
              
            });
        }
      });
  }
}
