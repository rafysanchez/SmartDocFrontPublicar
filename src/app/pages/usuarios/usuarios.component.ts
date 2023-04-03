
import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageTranslationModule, ConfirmacaoService, NotificacaoComponent, SpinnerComponent,
  VerificarTpErro, FuncoesGenericas, TraduzirErro } from '../shared';
import { Router } from '@angular/router';
import { LoginSapResponse, UserEntity, agGridParamEntity } from '../entity';
import { slideToTop } from 'src/app/router.animations';
import { HttpErrorResponse } from '@angular/common/http';
import { IGetRowsParams } from 'ag-grid-community';
import { agGridReturnEntity } from '../entity/agGridReturn';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  animations: [slideToTop()]
})
export class UsuariosComponent implements OnInit {
  collapedSideBar: boolean;
  columnDefs;
  rowData: any;
  private Notificacao: NotificacaoComponent;
  private loading: SpinnerComponent;
  User: LoginSapResponse;
  single = 'single';
  readGrid: any;
  paramsGrid: any;
  params: any;

  constructor(private usuariosservice: UsuariosService, private Notifi: NotifierService,
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
        headerName: 'Email',
        field: 'Email',
        suppressMenu: true,
        width: 90,
        enableRowGroup: true,
        filter: 'agTextColumnFilter',
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      },
      {
        headerName: 'Nome',
        field: 'Name',
        suppressMenu: true,
        width: 90,
        enableRowGroup: true,
        filter: 'agTextColumnFilter',
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      },
      {
        headerName: 'Descrição',
        field: 'Description',
        suppressMenu: true,
        width: 95,
        filter: 'agTextColumnFilter',
        enableRowGroup: true,
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      },
      {
        headerName: 'Notificações',
        suppressMenu: true,
        field: 'SendEmail',
        width: 44,
        filter: 'agTextColumnFilter',
        enableRowGroup: true,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        valueFormatter(data) {
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
          textFormatter(r) {
            if (r == null) { return ''; }
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
        headerName: 'Dias Pesquisa',
        suppressMenu: true,
        field: 'QtdDias',
        width: 52,
        filter: 'agNumberColumnFilter',
        enableRowGroup: true,
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      },
      {
        headerName: 'Status',
        suppressMenu: true,
        field: 'Ativo',
        width: 45,
        filter: 'agTextColumnFilter',
        enableRowGroup: true,
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      }
    ];
    // this.RequestUsuarios();
  }

  onGridReady(params) {
    this.paramsGrid = params.api;
    this.params = params;
    // this.RequestCustomers();
    const datasource = {
      // tslint:disable-next-line:no-shadowed-variable
      getRows: (params: IGetRowsParams) => {
        const GridParam: agGridParamEntity = new agGridParamEntity();
        GridParam.startRow = params.startRow;
        GridParam.endRow = params.endRow;
        GridParam.filterModel = JSON.stringify(params.filterModel);
        GridParam.sortModel = params.sortModel;

        const Usuario: UserEntity = new UserEntity();

        Usuario.Branch = this.User.Branch;
        Usuario.Active = null;
        Usuario.Token = this.User.Token;
        GridParam.filterData = Usuario;

        this.usuariosservice.RequestCustomers(GridParam).subscribe((data) => {
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

  Criar(): void {
    this.router.navigate(['principal/usuario']);
  }
  EditarLinha(e) {
    const User: UserEntity = e.rowData;
    this.router.navigate(['principal/usuario'], { queryParams: { id: User.Id }, skipLocationChange: true });
  }

  ExcluirLinha(e) {
    const User: UserEntity = e.rowData;
    // verifica se o usuário é admin e não exclui
    if (User.Admin) {
      this.Notificacao.showNotification('warning', TraduzirErro('MsgAdmin', this.translate));
      return;
    }


    this.confirmationDialogService.confirm('TitlePopExcluir', 'MsgExcluir')
      .then((confirmed) => {
        if (confirmed) {
          this.loading.Mostrar();
          this.usuariosservice.Excluir(this.User.Token, User.Id).subscribe((data) => {
            this.loading.Fechar();
            if (data != null) {
              this.RequestUsuarios();
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
  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

  RequestUsuarios() {
    const GridParam: agGridParamEntity = new agGridParamEntity();
    GridParam.startRow = 0;
    GridParam.endRow = 100;
    GridParam.filterModel = JSON.stringify(this.params.filterModel);
    GridParam.sortModel = this.params.sortModel;


    const Usuario: UserEntity = new UserEntity();
    Usuario.Branch = this.User.Branch;
    Usuario.Active = null;
    Usuario.Token = this.User.Token;
    GridParam.filterData = Usuario;
    this.usuariosservice.RequestCustomers(GridParam).subscribe((data) => {
      this.rowData = data;
    },
      (err: HttpErrorResponse) => {
        VerificarTpErro(this.router, err.error.ExceptionMessage, this.Notificacao, this.translate);
      });
  }

}
