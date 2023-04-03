/**
 * @description Componente de Exportações
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExportacoesService } from './exportacoes.service';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  LanguageTranslationModule, ConfirmacaoService, NotificacaoComponent, SpinnerComponent,
  VerificarTpErro, TraduzirErro
} from '../shared';
import { Router } from '@angular/router';
import { slideToTop } from 'src/app/router.animations';
import { LoginSapResponse, ExportacaoEntity, agGridParamEntity } from '../entity';
import { HttpErrorResponse } from '@angular/common/http';
import { IGetRowsParams } from 'ag-grid-community';
import { agGridReturnEntity } from '../entity/agGridReturn';
import {timer, Subscription} from 'rxjs';

@Component({
  selector: 'app-exportacoes',
  templateUrl: './exportacoes.component.html',
  styleUrls: ['./exportacoes.component.scss'],
  animations: [slideToTop()]
})
export class ExportacoesComponent implements OnInit, OnDestroy {
  columnDefs;
  rowData: any;
  private Notificacao: NotificacaoComponent;
  private loading: SpinnerComponent;
  User: LoginSapResponse;
  single = 'single';
  readGrid: any;
  paramsGrid: any;
  params: any;
   atualizar = timer(20000, 20000);
   subscription: Subscription;

  constructor(private exportacoesservice: ExportacoesService, private Notifi: NotifierService,
              private spinner: NgxSpinnerService, private translate: LanguageTranslationModule,
              private router: Router, private confirmationDialogService: ConfirmacaoService) {

    this.Notificacao = new NotificacaoComponent(Notifi);
    this.User = JSON.parse(localStorage.getItem('User'));
    this.loading = new SpinnerComponent(spinner);
    this.readGrid = this.onGridReady.bind(this);



  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
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
        headerName: 'Tipo de Documento',
        field: 'DocType',
        suppressMenu: true,
        width: 70,
        enableRowGroup: true,
        filter: 'agTextColumnFilter',
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      },
      {
        headerName: 'Nome Exportação',
        field: 'NmExport',
        suppressMenu: true,
        width: 100,
        enableRowGroup: false,
        filter: false,
        lockPinned: true,
        cellRenderer: ({ value, data }) => {
          if (value !== undefined) {
            const a = document.createElement('a');
            const rota = window.location.origin;
            a.target = '_blank';
            a.innerText = value;
            if (data.Archives[0] !== undefined) {
              a.href = data.Archives[0].DsCaminho.toString();
              a.download = value;
            }
            return a;
          }
        }

      },
      {
        headerName: 'Gerado',
        field: 'Generate',
        suppressMenu: true,
        width: 95,
        filter: 'agTextColumnFilter',
        enableRowGroup: true,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        valueFormatter: data => {
          if (data.value != null) {
            switch (data.value.toString()) {
              case 'true':
                return 'Sim';
                break;
              case 'false':
                return 'Não';
            }
          }

        },
        filterParams: {
          textFormatter: r => {
            if (r === null) { return ''; }
            switch (r) {
              case true:
                r = 'Sim';
                break;
              case false:
                r = 'Não';

            }
            return r;
          }
        }
      },
      {
        headerName: 'Observação',
        suppressMenu: true,
        field: 'DsMensagem',
        width: 200,
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
        const GridParam: agGridParamEntity = new agGridParamEntity();
        GridParam.startRow = params.startRow;
        GridParam.endRow = params.endRow;
        GridParam.filterModel = JSON.stringify(params.filterModel);
        GridParam.sortModel = params.sortModel;

        const Exportacao: ExportacaoEntity = new ExportacaoEntity();
        Exportacao.Branch = this.User.Branch;
        Exportacao.UserId = this.User.UserLogged.Id;
        Exportacao.Token = this.User.Token;
        GridParam.filterData = Exportacao;

        this.exportacoesservice.RequestExportacoes(GridParam).subscribe((data) => {
          const retorno = data as agGridReturnEntity;
          this.rowData = retorno.rows;
          params.successCallback(this.rowData, retorno.lastRow);

        },
          (err: HttpErrorResponse) => {
            VerificarTpErro(this.router, err.error.ExceptionMessage, this.Notificacao, this.translate);
          });
      }

    };
    this.subscription = this.atualizar.subscribe(val => this.ChamarDados());
    this.paramsGrid.setDatasource(datasource);
  }

  Criar() {
    this.router.navigate(['principal/exportacao']);
  }
  EditarLinha(e) {
    const Exportacao: ExportacaoEntity = e.rowData;
    this.router.navigate(['principal/exportacao'], { queryParams: { id: Exportacao.Id }, skipLocationChange: true });
  }
  AbrirDownload(e) {
    const Exportacao: ExportacaoEntity = e.rowData;
    this.router.navigate(['principal/exportacao'], { queryParams: { id: Exportacao.Id }, skipLocationChange: true });
  }

  ExcluirLinha(e) {
    const Exportacao: ExportacaoEntity = e.rowData;

    this.confirmationDialogService.confirm('TitlePopExcluir', 'MsgExcluir')
      .then((confirmed) => {
        if (confirmed) {
          // this.loading.Mostrar();
          this.exportacoesservice.Excluir(this.User.Token, Exportacao).subscribe((data) => {
            // this.loading.Fechar();
            if (data) {
              this.ChamarDados();
              this.Notificacao.showNotification('info', TraduzirErro('MgsDadosExcluidos', this.translate));
            } else {
              this.Notificacao.showNotification('info', TraduzirErro('MsgDadosExcluirErro', this.translate));
            }
          },
            (err: HttpErrorResponse) => {
              // this.loading.Fechar();
              VerificarTpErro(this.router, err.error.ExceptionMessage, this.Notificacao, this.translate);
            });
        }
      });
  }

  ChamarDados() {
    const GridParam: agGridParamEntity = new agGridParamEntity();
    GridParam.startRow = 0;
    GridParam.endRow = 100;
    GridParam.filterModel = JSON.stringify(this.params.filterModel);
    GridParam.sortModel = this.params.sortModel;

    const Exportacao: ExportacaoEntity = new ExportacaoEntity();
    Exportacao.Branch = this.User.Branch;
    Exportacao.UserId = this.User.UserLogged.Id;
    Exportacao.Token = this.User.Token;
    GridParam.filterData = Exportacao;

    this.exportacoesservice.RequestExportacoes(GridParam).subscribe((data) => {
      const retorno = data as agGridReturnEntity;
      this.rowData = retorno.rows;
      const datasource = {
        getRows: (params: IGetRowsParams) => {
          params.successCallback(this.rowData, retorno.lastRow);
        }
      };
      this.paramsGrid.setDatasource(datasource);

    },
      (err: HttpErrorResponse) => {
        VerificarTpErro(this.router, err.error.ExceptionMessage, this.Notificacao, this.translate);
      });
  }

}
