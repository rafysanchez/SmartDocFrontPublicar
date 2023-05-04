import { OrderModule } from 'ngx-order-pipe';
/* *
 * @description Componente do Log de Eventos
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */

import { Component, OnInit, NgZone } from '@angular/core';
import { slideToTop } from 'src/app/router.animations';
import { NotificacaoComponent, SpinnerComponent, LanguageTranslationModule, ConfirmacaoService, VerificarTpErro } from '../shared';
import { LoginSapResponse, LogEntity, AgGridParamEntity } from '../entity';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { LogeventosService } from './logeventos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { IGetRowsParams } from 'ag-grid-community';
import { agGridReturnEntity } from '../entity/agGridReturn';

@Component({
  selector: 'app-logeventos',
  templateUrl: './logeventos.component.html',
  styleUrls: ['./logeventos.component.scss'],
  animations: [slideToTop()]
})
export class LogeventosComponent implements OnInit {
  columnDefs;
  rowData: any;
  private Notificacao: NotificacaoComponent;
  private loading: SpinnerComponent;
  User: LoginSapResponse;
  single = 'single';
  readGrid: any;
  paramsGrid: any;
  params: any;

  constructor(private logservice: LogeventosService, private Notifi: NotifierService,
    private spinner: NgxSpinnerService, private translate: LanguageTranslationModule,
    private router: Router) {

    this.Notificacao = new NotificacaoComponent(this.Notifi);
    this.User = JSON.parse(localStorage.getItem('User'));
    this.loading = new SpinnerComponent(this.spinner);
    this.readGrid = this.onGridReady.bind(this);

  }

  ngOnInit() {
    // Define as colunas do Grid
    this.columnDefs = [
      {
        headerName: 'Data e Hora Criação',
        field: 'CreatedIn',
        suppressMenu: true,
        width: 55,
        enableRowGroup: true,
        filter: 'agTextColumnFilter',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        valueFormatter: data => {
          if (data.value != null) {
            return moment(data.value).format('DD/MM/YYYY HH:mm:ss');
          } else {
            return '';
          }
        }
      },
      {
        headerName: 'Usuário',
        field: 'User.Name',
        suppressMenu: true,
        width: 70,
        filter: 'agTextColumnFilter',
        enableRowGroup: true,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        sortable: false
      },
      {
        headerName: 'Função',
        field: 'Function',
        suppressMenu: true,
        width: 40,
        filter: 'agTextColumnFilter',
        enableRowGroup: true,
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      },
      {
        headerName: 'Categoria',
        suppressMenu: true,
        field: 'Category',
        width: 40,
        filter: 'agTextColumnFilter',
        enableRowGroup: true,
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      },
      {
        headerName: 'Descrição',
        suppressMenu: true,
        field: 'Description',
        width: 110,
        filter: 'agTextColumnFilter',
        enableRowGroup: true,
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      }
    ];
    // this.ChamarDados();
  }

  onGridReady(params) {
    this.paramsGrid = params.api;
    this.params = params;

    const datasource = {
      // tslint:disable-next-line: no-shadowed-variable
      getRows: (params: IGetRowsParams) => {
        const GridParam: AgGridParamEntity = new AgGridParamEntity();
        GridParam.startRow = params.startRow;
        GridParam.endRow = params.endRow;
        GridParam.filterModel = JSON.stringify(params.filterModel);
        GridParam.sortModel = params.sortModel;

        const Log: LogEntity = new LogEntity();
        Log.Branch = this.User.Branch;
        GridParam.filterData = Log;

        this.logservice.RequestLog(this.User.Token, GridParam).subscribe((data) => {
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
  }

  ChamarDados() {
    const GridParam: AgGridParamEntity = new AgGridParamEntity();
    GridParam.startRow = 0;
    GridParam.endRow = 100;
    GridParam.filterModel = JSON.stringify(this.params.filterModel);
    GridParam.sortModel = this.params.sortModel;

    const Log: LogEntity = new LogEntity();
    Log.Branch = this.User.Branch;
    GridParam.filterData = Log;

    this.loading.Mostrar();
    this.logservice.RequestLog(this.User.Token, GridParam).subscribe((data) => {
      this.rowData = data;
    },
      (err: HttpErrorResponse) => {
        VerificarTpErro(this.router, err.error.ExceptionMessage, this.Notificacao, this.translate);
      });
    this.loading.Fechar();
  }
}
