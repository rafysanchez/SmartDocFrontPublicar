
import { Component, OnInit, NgZone } from '@angular/core';
import { slideToTop } from 'src/app/router.animations';
import { CnpjsService } from './cnpjs.service';
import { NotificacaoComponent, SpinnerComponent, LanguageTranslationModule, VerificarTpErro,
  FuncoesGenericas, ConfirmacaoService, TraduzirErro } from '../shared';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginSapResponse, CustomerEntity, agGridParamEntity } from '../entity';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { IGetRowsParams } from 'ag-grid-community';
import { agGridReturnEntity } from '../entity/agGridReturn';
@Component({
  selector: 'app-cnpjs',
  templateUrl: './cnpjs.component.html',
  styleUrls: ['./cnpjs.component.scss'],
  animations: [slideToTop()]
})
export class CnpjsComponent implements OnInit {
  private Notificacao: NotificacaoComponent;
  private loading: SpinnerComponent;
  collapedSideBar: boolean;
  User: LoginSapResponse;
  columnDefs;
  rowData: any;
  single = 'single';
  readGrid: any;
  paramsGrid: any;
  params: any;

  constructor(private cnpjsservice: CnpjsService, private Notifi: NotifierService,
              private spinner: NgxSpinnerService, private translate: LanguageTranslationModule,
              private Activatedroute: ActivatedRoute, private router: Router, private zone: NgZone,
              private confirmationDialogService: ConfirmacaoService) {

    this.Notificacao = new NotificacaoComponent(Notifi);
    this.User = JSON.parse(localStorage.getItem('User'));
    this.loading = new SpinnerComponent(spinner);
    this.readGrid = this.onGridReady.bind(this);
  }

  ngOnInit() {
    // * Define as colunas do Grid
    this.columnDefs = [
      {

        width: 40,
        filter: false,
        lockPinned: true,
        suppressSizeToFit: true,
        cellRenderer: 'imageRenderer',
        suppressToolPanel: true,
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
        suppressToolPanel: true,
        cellRenderer: 'imageRenderer',
        cellRendererParams: {
          onClick: this.ExcluirLinha.bind(this),
          icon: 'fa-times',
          tooltip: 'Excluir'
        }

      },
      {
        headerName: 'Cnpj',
        field: 'CNPJ',
        width: 60,
        enableRowGroup: true,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        valueFormatter: function (data) {
          if (data.value !== undefined) {
            return FuncoesGenericas.FormatarStringCnpj(data.value);
          }
        },
        filterParams: {
          textFormatter: function (r) {
            if (r == null) { return null; }
            r = FuncoesGenericas.FormatarStringCnpj(r.toString());
            return r;
          }
        }
      },
      {
        headerName: 'Nome',
        field: 'Name',
        width: 120,
        enableRowGroup: true,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      },
      {
        headerName: 'Descrição',
        field: 'Description',
        suppressMenu: true,
        width: 80,
        filter: 'agTextColumnFilter',
        enableRowGroup: true,
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      },
      {
        headerName: 'Status',
        field: 'Ativo',
        suppressMenu: true,
        width: 46,
        filter: 'agTextColumnFilter',
        enableRowGroup: true,
        cellRenderer: 'agAnimateShowChangeCellRenderer'

      },
      {
        headerName: 'Data Venc. Certificado',
        field: 'DtVencCert',
        suppressMenu: true,
        width: 60,
        filter: 'agDateColumnFilter',
        enableRowGroup: true,
        valueFormatter: function (data) {
          if (data.value != null) {
            return moment(data.value).format('L');
          }
          else {
            return '';
          }
        },
        filterParams: {
          comparator: function (filterLocalDateAtMidnight, cellValue) {
            let dateAsString = moment(cellValue).format('L');
            let dateParts = dateAsString.split('/');
            let cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));

            if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
              return 0;
            }

            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            }

            if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            }
          }
        }, floatingFilterComponentParams: {
          suppressFilterButton: true
        }

      }
    ];
    // this.BuscarCnpj();
  }

  onGridReady(params) {
    this.paramsGrid = params.api;
    this.params = params;
    const datasource = {
      getRows: (params2: IGetRowsParams) => {
        const GridParam: agGridParamEntity = new agGridParamEntity();
        GridParam.startRow = params2.startRow;
        GridParam.endRow = params2.endRow;
        GridParam.filterModel = JSON.stringify(params2.filterModel);
        GridParam.sortModel = params2.sortModel;

        const Cnpjs: CustomerEntity = new CustomerEntity();
        Cnpjs.Branch = this.User.Branch;
        Cnpjs.Active = null;
        Cnpjs.Token = this.User.Token;
        GridParam.filterData = Cnpjs;

        this.cnpjsservice.RequestCnpjs(GridParam).subscribe((data) => {
          const retorno = data as agGridReturnEntity;
          this.rowData = retorno.rows;
          params2.successCallback(this.rowData, retorno.lastRow);

        },
          (err: HttpErrorResponse) => {
            VerificarTpErro(this.router, err.error.ExceptionMessage, this.Notificacao, this.translate);
          });
      }

    }

    this.paramsGrid.setDatasource(datasource);
  }

  CriarCnpj(): void {
    this.router.navigate(['principal/cnpj']);
  }

  EditarLinha(e) {
    this.zone.run(() => {
      const Customer: CustomerEntity = e.rowData;
      this.router.navigate(['principal/cnpj'], { queryParams: { id: Customer.Id }, skipLocationChange: true });
    });
  }

  ExcluirLinha(e) {
    const Customer: CustomerEntity = e.rowData;
    this.confirmationDialogService.confirm('TitlePopExcluir', 'MsgExcluir')
      .then((confirmed) => {
        if (confirmed) {
          this.loading.Mostrar();
          this.cnpjsservice.Excluir(this.User.Token, Customer.Id, this.User.Branch).subscribe((data) => {
            this.loading.Fechar();
            if (data == null) {
              this.BuscarCnpj();
              this.Notificacao.showNotification('info', TraduzirErro('MgsDadosExcluidos', this.translate));
            }  else {
              this.Notificacao.showNotification('info', TraduzirErro('MsgDadosExcluirErro', this.translate));
            }
          },
            (err: HttpErrorResponse) => {
              this.loading.Fechar();
              VerificarTpErro(this.router, err.error.ExceptionMessage, this.Notificacao, this.translate);
            })
        }
      });
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

  BuscarCnpj(): void {
    const GridParam: agGridParamEntity = new agGridParamEntity();
    GridParam.startRow = 0;
    GridParam.endRow = 100;
    GridParam.filterModel = JSON.stringify(this.params.filterModel);
    GridParam.sortModel = this.params.sortModel;


    const Cnpj: CustomerEntity = new CustomerEntity();
    Cnpj.Branch = this.User.Branch;
    Cnpj.Active = null;
    Cnpj.Token = this.User.Token;
    GridParam.filterData = Cnpj;
    Cnpj.Branch = this.User.Branch;

    this.cnpjsservice.RequestCnpjs(GridParam).subscribe((data) => {
      this.rowData = data;
    },
      (err: HttpErrorResponse) => {
        VerificarTpErro(this.router, err.error.ExceptionMessage, this.Notificacao, this.translate);
      });
  }

}
