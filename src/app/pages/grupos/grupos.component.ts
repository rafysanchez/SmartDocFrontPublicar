/* *
 * @description Componente dos grupos
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Component, OnInit, NgZone } from '@angular/core';
import { slideToTop } from 'src/app/router.animations';
import { GruposService } from './grupos.service';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  LanguageTranslationModule, VerificarTpErro, NotificacaoComponent, ConfirmacaoService,
  SpinnerComponent, TraduzirErro
} from '../shared';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginSapResponse, GrupoEntity, agGridParamEntity } from '../entity';
import { IGetRowsParams } from 'ag-grid-community';
import { agGridReturnEntity } from '../entity/agGridReturn';


@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss'],
  animations: [slideToTop()]

})
export class GruposComponent implements OnInit {
  columnDefs;
  rowData: any;
  private Notificacao: NotificacaoComponent;
  private loading: SpinnerComponent;
  User: LoginSapResponse;
  single = 'single';
  readGrid: any;
  paramsGrid: any;
  params: any;

  constructor(private gruposservice: GruposService, private Notifi: NotifierService,
              private spinner: NgxSpinnerService, private translate: LanguageTranslationModule,
              private router: Router, private confirmationDialogService: ConfirmacaoService, private zone: NgZone) {

    this.Notificacao = new NotificacaoComponent(this.Notifi);
    this.User = JSON.parse(localStorage.getItem('User'));
    this.loading = new SpinnerComponent(this.spinner);
    this.readGrid = this.onGridReady.bind(this);

  }


  CriarGrupo(): void {
    this.router.navigate(['principal/grupo']);
  }
  EditarLinha(e) {
    this.zone.run(() => {
      const Grupo: GrupoEntity = e.rowData;
      this.router.navigate(['principal/grupo'], { queryParams: { id: Grupo.Id }, skipLocationChange: true });
    });
  }

  ExcluirLinha(e) {
    const Grupo: GrupoEntity = e.rowData;
    this.confirmationDialogService.confirm('TitlePopExcluir', 'MsgExcluir')
      .then((confirmed) => {
        if (confirmed) {
          this.loading.Mostrar();
          this.gruposservice.Excluir(this.User.Token, Grupo.Id).subscribe((data) => {
            this.loading.Fechar();
            if (data === true) {
              this.RequestCustomers();
              this.Notificacao.showNotification('info', TraduzirErro('MgsDadosExcluidos', this.translate));
            } else {
              this.Notificacao.showNotification('info', TraduzirErro('MsgDadosExcluirErro', this.translate));
            }
          },
            (err: HttpErrorResponse) => {
              this.loading.Fechar();
              VerificarTpErro(this.router, err.error.ExceptionMessage, this.Notificacao, this.translate);
            });
        }
      });

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
        headerName: 'Nome',
        field: 'Name',
        suppressMenu: true,
        width: 150,
        enableRowGroup: true,
        filter: 'agTextColumnFilter',
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      },
      {
        headerName: 'Descrição',
        field: 'Description',
        suppressMenu: true,
        width: 90,
        filter: 'agTextColumnFilter',
        enableRowGroup: true,
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      },
      {
        headerName: 'Status',
        suppressMenu: true,
        field: 'Ativo',
        width: 30,
        filter: 'agTextColumnFilter',
        enableRowGroup: true,
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      }
    ];
    // this.RequestCustomers();
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

        const Grupo: GrupoEntity = new GrupoEntity();
        Grupo.Branch = this.User.Branch;
        Grupo.Active = null;
        Grupo.Token = this.User.Token;
        GridParam.filterData = Grupo;

        this.gruposservice.RequestGroup(GridParam).subscribe((data) => {
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


  RequestCustomers() {
    const GridParam: agGridParamEntity = new agGridParamEntity();
    GridParam.startRow = 0;
    GridParam.endRow = 100;
    GridParam.filterModel = JSON.stringify(this.params.filterModel);
    GridParam.sortModel = this.params.sortModel;


    const Grupo: GrupoEntity = new GrupoEntity();
    Grupo.Branch = this.User.Branch;
    Grupo.Active = null;
    Grupo.Token = this.User.Token;
    GridParam.filterData = Grupo;
    this.gruposservice.RequestGroup(GridParam).subscribe((data) => {
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
