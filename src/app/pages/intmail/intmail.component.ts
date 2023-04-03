
// tslint:disable-next-line: import-spacing
import { Component, OnInit, NgZone } from '@angular/core';
import { slideToTop } from 'src/app/router.animations';
import {
  LanguageTranslationModule, NotificacaoComponent, SpinnerComponent,
  VerificarTpErro, FuncoesGenericas, MyErrorStateMatcher, TraduzirErro, GridComponent
} from '../shared';
import { LoginSapResponse, DocumentosEmailEntity, DocumentosEmailFiltrosEntity, agGridParamEntity } from '../entity';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { IntmailService } from './intmail.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { agGridReturnEntity } from '../entity/agGridReturn';
import { GridOptions, IGetRowsParams } from 'ag-grid-community';
import { ViewChild, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
// tslint:disable-next-line: import-spacing


@ViewChild('agGrid', { static: true })

@Component({
  selector: 'app-intmail',
  templateUrl: './intmail.component.html',
  styleUrls: ['./intmail.component.scss'],
  animations: [slideToTop()]
})
export class IntmailComponent implements OnInit {
  gridOptions: GridOptions;
  columnDefs;
  rowData: any;
  private Notificacao: NotificacaoComponent;
  private loading: SpinnerComponent;
  User: LoginSapResponse;
  documentStatusEmail: any;
  documentEmailEmail: any;
  single = 'single';
  readGrid: any;
  paramsGrid: any;
  params: any;
  registerForm: FormGroup;
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  get f() { return this.registerForm.controls; }

  constructor(private intmailservice: IntmailService, private Notifi: NotifierService,
              private spinner: NgxSpinnerService, private translate: LanguageTranslationModule,
              private router: Router, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {

    this.Notificacao = new NotificacaoComponent(this.Notifi);
    this.User = JSON.parse(localStorage.getItem('User'));
    this.loading = new SpinnerComponent(this.spinner);
    this.readGrid = this.onGridReady.bind(this);

  }

  ngOnInit() {
    // Define as colunas do Grid
    this.columnDefs = [
      {
        headerName: 'ID',
        field: 'Id',
        suppressMenu: true,
        width: 180,
        enableRowGroup: true,
        filter: 'agTextColumnFilter',
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      },
      {
        headerName: 'Enviado por',
        field: 'documentEmailEmail.SENDE',
        suppressMenu: true,
        width: 400,
        enableRowGroup: true,
        filter: 'agTextColumnFilter',
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      },
      {
        headerName: 'Assunto',
        field: 'documentEmailEmail.SUBJE',
        suppressMenu: true,
        width: 400,
        enableRowGroup: true,
        filter: 'agTextColumnFilter',
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      },
      {
        headerName: 'Data do E-mail',
        field: 'documentEmailEmail.DTENV',
        suppressMenu: true,
        width: 250,
        filter: 'agTextColumnFilter',
        enableRowGroup: true,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        valueFormatter: data => {
          if (data.value != null) {
            return moment(data.value).format('DD/MM/YYYY');
          } else {
            return '';
          }
        }
      },
      {
        headerName: 'Hora do E-mail',
        field: 'documentEmailEmail.HRENV',
        suppressMenu: true,
        width: 170,
        enableRowGroup: true,
        filter: 'agTextColumnFilter',
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      },
      {
        headerName: 'Erros',
        // field: 'documentStatusEmails',
        suppressMenu: true,
        // filter: 'agTextColumnFilter',
        width: 400,
        sortable: false,
        cellRenderer: ({ value, data }) => {
          if (data !== undefined) {
            let Dados = '';
            // console.log(data.data.documentStatusEmails.length);
            // console.log(data.data.documentStatusEmails);
            if (data.documentStatusEmails.length > 0) {
              for (const valor of data.documentStatusEmails) {
                Dados += valor.DESCR + ',';

              }
              if (Dados !== '') {
                Dados = Dados.substring(0, Dados.length - 1);
              }
            }
            return Dados;
          }
          // console.log(Dados);
        },

      },
      {
        headerName: 'Data de Integração',
        field: 'DTINT',
        suppressMenu: true,
        width: 250,
        enableRowGroup: true,
        filter: 'agTextColumnFilter',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        valueFormatter: data => {
          if (data.value != null) {
            return moment(data.value).format('DD/MM/YYYY');
          } else {
            return '';
          }
        }
      },
      {
        headerName: 'Hora de Integração',
        field: 'HRINT',
        suppressMenu: true,
        width: 170,
        filter: 'agTextColumnFilter',
        enableRowGroup: true,
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      },
      {
        headerName: 'Data de Procesamento',
        field: 'DTPRC',
        suppressMenu: true,
        width: 250,
        enableRowGroup: true,
        filter: 'agTextColumnFilter',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        valueFormatter: data => {
          if (data.value != null) {
            return moment(data.value).format('DD/MM/YYYY');
          } else {
            return '';
          }
        }
      },
      {
        headerName: 'Hora de Procesamento',
        field: 'HRPRC',
        suppressMenu: true,
        width: 170,
        filter: 'agTextColumnFilter',
        enableRowGroup: true,
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      }
    ];

    this.registerForm = this.formBuilder.group({
      SENDE: [''],
      DTENVstart: ['', FuncoesGenericas.ValidDate],
      DTENVend: ['', FuncoesGenericas.ValidDate],
    });

    // this.ChamarDados();
  }

  Limpar() {
    this.registerForm.controls.SENDE.setValue('');
    this.registerForm.controls.DTENVstart.setValue('');
    this.registerForm.controls.DTENVend.setValue('');
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.controls[key].setErrors(null);
    });

    this.onSubmit();
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      this.Notificacao.showNotification('warning', TraduzirErro('MsgDadosInvalidos', this.translate));
      return;
    }

    const intmailconst: DocumentosEmailFiltrosEntity = new DocumentosEmailFiltrosEntity();
    intmailconst.Branch = this.User.Branch;

    if (this.registerForm.controls.SENDE.value !== undefined) {
        intmailconst.SENDE = this.registerForm.controls.SENDE.value;
    }

    if (this.registerForm.controls.DTENVstart.value !== '') {
      if (this.registerForm.controls.DTENVstart.value === '') {
        this.Notificacao.showNotification('warning', TraduzirErro('MsgErroDtEmiAte', this.translate));
        return;
      }

      intmailconst.DTENVstart = this.registerForm.controls.DTENVstart.value.substring(0, 2) +
      '/' + this.registerForm.controls.DTENVstart.value.substring(2, 4) +
      '/' + this.registerForm.controls.DTENVstart.value.substring(4, 8);
    }

    if (this.registerForm.controls.DTENVend.value !== '') {
      if (this.registerForm.controls.DTENVend.value === '') {
        this.Notificacao.showNotification('warning', TraduzirErro('MsgErroDtEmiDe', this.translate));
        return;
      }

      intmailconst.DTENVend = this.registerForm.controls.DTENVend.value.substring(0, 2) +
      '/' + this.registerForm.controls.DTENVend.value.substring(2, 4) +
      '/' + this.registerForm.controls.DTENVend.value.substring(4, 8);
    }

    this.PesquisarDados(intmailconst);

  }


  onGridReady(params) {
    this.paramsGrid = params.api;
    this.params = params;

    const datasource = {
      // tslint:disable-next-line: no-shadowed-variable
      getRows: (params: IGetRowsParams) => {
        const GridParam: agGridParamEntity = new agGridParamEntity();
        GridParam.startRow = params.startRow;
        GridParam.endRow = params.endRow;
        GridParam.filterModel = JSON.stringify(params.filterModel);
        GridParam.sortModel = params.sortModel;
        GridParam.Token = this.User.Token;
        const intmailconst: DocumentosEmailFiltrosEntity = new DocumentosEmailFiltrosEntity();
        intmailconst.Branch = this.User.Branch;
        intmailconst.Token = this.User.Token;

        if (this.registerForm.controls.SENDE.value !== undefined) {
          intmailconst.SENDE = this.registerForm.controls.SENDE.value;
      }

        GridParam.filterData = intmailconst;

        this.intmailservice.RequestDocumentEmail(GridParam).subscribe((data) => {
          const retorno = data as agGridReturnEntity;
          // console.log('retorno.rows: ',retorno.rows);
          this.rowData = retorno.rows;
          params.successCallback(this.rowData, retorno.lastRow);

        },
          (err: HttpErrorResponse) => {
            VerificarTpErro(this.router, err.error.ExceptionMessage, this.Notificacao, this.translate);
          });
      }

    };

    this.paramsGrid.setDatasource(datasource);
  }

  PesquisarDados(intmailconst: DocumentosEmailFiltrosEntity) {
    // this.RequestCustomers();
    const datasource = {
      getRows: (params: IGetRowsParams) => {
    const GridParam: agGridParamEntity = new agGridParamEntity();
    GridParam.startRow = 0;
    GridParam.endRow = 100;
    GridParam.filterModel = JSON.stringify(this.params.filterModel);
    GridParam.sortModel = this.params.sortModel;
    // intmailconst = new DocumentosEmailFiltrosEntity();
    intmailconst.Branch = this.User.Branch;
    intmailconst.Token = this.User.Token;
    GridParam.filterData = intmailconst;

    this.intmailservice.RequestDocumentEmail( GridParam).subscribe((data) => {
      const retorno = data as agGridReturnEntity;
      this.rowData = retorno.rows;
      params.successCallback(this.rowData, retorno.lastRow);
    },
      (err: HttpErrorResponse) => {
        VerificarTpErro(this.router, err.error.ExceptionMessage, this.Notificacao, this.translate);
      });
    }
};
    this.paramsGrid.setDatasource(datasource);
}}
