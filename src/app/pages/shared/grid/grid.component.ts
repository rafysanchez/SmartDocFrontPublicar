import { style } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { LanguageTranslationModule } from '../language-translation.module';
import { TraduzirGrid } from '../grid.linguagem';
import 'ag-grid-enterprise';
import { ImageRendererComponent } from './componentes/imagem.component';
import { CheckboxRenderComponent } from './componentes/checkbox.component';
import { LicenseManager } from 'ag-grid-enterprise';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  /* *Variáveis */
  gridOptions: GridOptions;
  gridApi;
  gridColumnApi;
  paginationNumberFormatter;
  @Input() paginationPageSize: number;
  @Input() cacheBlockSize: number;
  @Input() rowSelection: string;
  @Input() columnDefs: {};
  @Input() rowData: any;
  @Input() alinhar: any;
  @Input() height: any;
  @Input() iniciar: any;
  @Input() pagina: any;
  @Input() rowModelType: any;
  style: any;
  constructor(private translate: LanguageTranslationModule) {

    // tslint:disable-next-line: max-line-length
    LicenseManager.setLicenseKey('CompanyName=Trust Addvisor,LicensedApplication=Smartdocx,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=0,AssetReference=AG-008345,ExpiryDate=1_June_2021_[v2]_MTYyMjUwMjAwMDAwMA==34513c80cb6ea4268fbf7341671b4c33');

    // Define quais as features que o grid vai ter
    this.gridOptions = {
      // treeData: true,
      gridAutoHeight: true,
      // Dados a serem exibidos
      // rowData: this.rowData,
      // se as linhas serão multi selecionadas ou não
      rowSelection: this.rowSelection,
      rowData: this.rowData,
      // define o tamanho da  barra de agrupamento
      // autoGroupColumnDef: { width: 150 },
      // define como vai mostrar o painel de grupo
      // rowGroupPanelShow: 'always',
      // Traduz o grid
      localeText: TraduzirGrid(this.translate),
      // Definições da sidebar (barra de totalizadores)
      // statusBar: {
      //   statusPanels: [
      //     {
      //       statusPanel: 'agTotalAndFilteredRowCountComponent',
      //       align: 'left'
      //     },
      //     {
      //       statusPanel: 'agTotalRowCountComponent',
      //       align: 'center'
      //     },
      //     { statusPanel: 'agFilteredRowCountComponent' },
      //     { statusPanel: 'agSelectedRowCountComponent' },
      //     { statusPanel: 'agAggregationComponent' }
      //   ]
      // },
      // Definições de qual ou quais paineis ira ser mostrado o painel do lado direito do grid
      /* sideBar: {
        toolPanels: ['columns']
      }, */
      // Auto ajuste do grid no layout
      // domLayout: 'autoHeight',
      // Quantidade de registros por página
      // pagination: true,
      paginationPageSize: this.paginationPageSize,
      infiniteInitialRowCount: 1000,
      cacheOverflowSize: 2,
      maxBlocksInCache: 10,
      // maxConcurrentDatasourceRequests:2,
      rowModelType: 'infinite',
      floatingFilter: false,
      animateRows: true,
      accentedSort: true,
      sortingOrder: ['desc', 'asc', null],
      enableCellTextSelection: true,
      // Cria um default para todas as colunas
      defaultColDef: {
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
        sortable: true,
        filter: false,
        resizable: true,
        suppressMenu: true,
        lockPosition: true
      },
      // Componentes que serão utilizados
      frameworkComponents: {
        floatingFilterComponent: 'agSetColumnFloatingFilter',
        imageRenderer: ImageRendererComponent,
        checkboxeRender: CheckboxRenderComponent
      },
    };
  }

  ngOnInit() {
    if (this.height === undefined) {
      this.style = {
        widt: '100%',
        height: '500px'
      };
    } else {
      this.style = {
        width: '100%',
        height: this.height + 'px'
      };
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setDomLayout('normal');
    params.api.sizeColumnsToFit();
    if (this.iniciar !== undefined) {
      this.iniciar(params);
    }
  }


}
