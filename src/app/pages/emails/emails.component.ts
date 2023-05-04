/**
 * @description Componente de Emails
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Component, OnInit } from '@angular/core';
import { EmailsService } from './emails.service';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageTranslationModule, ConfirmacaoService, NotificacaoComponent,
  SpinnerComponent, TraduzirErro, VerificarTpErro } from '../shared';
import { Router } from '@angular/router';
import { slideToTop } from 'src/app/router.animations';
import { LoginSapResponse, EmailEntity, AgGridParamEntity } from '../entity';
import { HttpErrorResponse } from '@angular/common/http';
import { IGetRowsParams } from 'ag-grid-community';
import { agGridReturnEntity } from '../entity/agGridReturn';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss'],
  animations: [slideToTop()]
})
export class EmailsComponent implements OnInit {
  columnDefs;
  rowData: any;
  private Notificacao: NotificacaoComponent;
  private loading: SpinnerComponent;
  User: LoginSapResponse;
  single = 'single';
  readGrid: any;
  paramsGrid: any;
  params: any;

  constructor(private emailservice: EmailsService, private Notifi: NotifierService,
              private spinner: NgxSpinnerService, private translate: LanguageTranslationModule,
              private router: Router, private confirmationDialogService: ConfirmacaoService) {

    this.Notificacao = new NotificacaoComponent(Notifi);
    this.User = JSON.parse(localStorage.getItem('User'));
    this.loading = new SpinnerComponent(spinner);
    this.readGrid = this.onGridReady.bind(this);
  }

  ngOnInit() {
    // Define as colunas do Grid
    this.columnDefs = [
      {

        width: 40,
        filter: false,
        lockPinned: true,
        suppressSizeToFit: true,
        cellRenderer: 'imageRenderer',
        suppressToolPanel: true,
        suppressMenu: true,
        cellRendererParams: {
          onClick: this.EditarLinha.bind(this),
          icon: 'fa-edit',
          tooltip: 'Editar'
        }

      },
      {

        width: 38,
        filter: false,
        lockPinned: true,
        suppressSizeToFit: true,
        suppressMenu: true,
        cellRenderer: 'imageRenderer',
        cellRendererParams: {
          onClick: this.ExcluirLinha.bind(this),
          icon: 'fa-times',
          tooltip: 'Excluir'
        }

      },
      {
        headerName: 'E-Mail',
        field: 'Mail',
        width: 120,
        enableRowGroup: true,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
      },
      {
        headerName: 'Serviço',
        field: 'Service',
        width: 80,
        enableRowGroup: true,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      },
      {
        headerName: 'Protocolo',
        field: 'Protocol',
        suppressMenu: true,
        width: 35,
        filter: 'agTextColumnFilter',
        enableRowGroup: true,
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      },
      {
        headerName: 'SSl',
        field: 'SSL',
        suppressMenu: true,
        width: 40,
        filter: 'agTextColumnFilter',
        enableRowGroup: true,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        valueFormatter: data => {
          if (data.value !== undefined) {
            switch (data.value.toString()) {
              case 'true':
                return 'Sim';
                break;
              case 'false':
                return 'Não';
                break;
            }
          }
        },
        filterParams: {
          textFormatter: r => {
            if (r == null) { return null; }
            switch (r.toString()) {
              case 'true':
                r = 'Sim';
                break;
              case 'false':
                r = 'Não';
                break;
            }
            return r;
          }
        }
      },
      {
        headerName: 'Status',
        field: 'Active',
        suppressMenu: true,
        width: 50,
        filter: 'agTextColumnFilter',
        enableRowGroup: true,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        valueFormatter: data => {
          if (data.value !== undefined) {
            switch (data.value.toString()) {
              case 'true':
                return 'Ativo';
                break;
              case 'false':
                return 'Inativo';
                break;
            }
          }
        },
        filterParams: {
          textFormatter: r => {
            if (r == null) { return null; }
            switch (r.toString()) {
              case 'true':
                r = 'Ativo';
                break;
              case 'false':
                r = 'Inativo';
                break;
            }
            return r;
          }
        }
      }
    ];
    // this.BuscarEmails();
  }
  onGridReady(params) {
    this.paramsGrid = params.api;
    this.params = params;
    // this.RequestCustomers();
    const datasource = {
      getRows: (params2: IGetRowsParams) => {
        const GridParam: AgGridParamEntity = new AgGridParamEntity();
        GridParam.startRow = params2.startRow;
        GridParam.endRow = params2.endRow;
        GridParam.filterModel = JSON.stringify(params2.filterModel);
        GridParam.sortModel = params2.sortModel;

        const Email: EmailEntity = new EmailEntity();
        Email.Branch = this.User.Branch;
        Email.Active = null;
        Email.Token = this.User.Token;
        GridParam.filterData = Email;

        this.emailservice.RequestEmails(GridParam).subscribe((data) => {
          const retorno = data as agGridReturnEntity;
          this.rowData = retorno.rows;
          params2.successCallback(this.rowData, retorno.lastRow);

        },
          (err: HttpErrorResponse) => {
            VerificarTpErro(this.router, err.error.ExceptionMessage, this.Notificacao, this.translate);
          });
      }

    };

    this.paramsGrid.setDatasource(datasource);
  }

  Criar(): void {
    this.router.navigate(['principal/email']);
  }

  EditarLinha(e ) {
    const Email: EmailEntity = e.rowData;
    console.log('emailId', Email.Id);

    this.router.navigate(['principal/email'], { queryParams: { id: Email.Id }, skipLocationChange: true });
  }

  ExcluirLinha(e) {
    const Email: EmailEntity = e.rowData;
    this.confirmationDialogService.confirm('TitlePopExcluir', 'MsgExcluir')
      .then((confirmed) => {
        if (confirmed) {
          this.loading.Mostrar();
          this.emailservice.Excluir(this.User.Token, Email.Id, this.User.Branch ).subscribe((data) => {
            this.loading.Fechar();
            if (data) {
              this.BuscarEmails();
              this.Notificacao.showNotification('info', TraduzirErro('MgsDadosExcluidos', this.translate));
            }

          },
            (err: HttpErrorResponse) => {
              this.loading.Fechar();
              VerificarTpErro(this.router, err.error.ExceptionMessage, this.Notificacao, this.translate);
            });
        }
      });
  }

  BuscarEmails(): void {
    const GridParam: AgGridParamEntity = new AgGridParamEntity();
    GridParam.startRow = 0;
    GridParam.endRow = 100;
    GridParam.filterModel = JSON.stringify(this.params.filterModel);
    GridParam.sortModel = this.params.sortModel;


    const Email: EmailEntity = new EmailEntity();
    Email.Branch = this.User.Branch;
    Email.Token = this.User.Token;
    Email.Active = null;

    GridParam.filterData = Email;

    this.emailservice.RequestEmails(GridParam).subscribe((data) => {
      this.rowData = data;
    },
      (err: HttpErrorResponse) => {
        VerificarTpErro(this.router, err.error.ExceptionMessage, this.Notificacao, this.translate);
      });
  }
}
