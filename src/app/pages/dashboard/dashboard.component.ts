import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { slideToTop } from 'src/app/router.animations';
import * as pbi from 'powerbi-client';
import { DashboardService } from './dashboard.service';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageTranslationModule, NotificacaoComponent, SpinnerComponent, TraduzirErro, VerificarTpErro } from '../shared';
import { HttpErrorResponse } from '@angular/common/http';
import { EmbedConfigEntity, GrupoEntity, LoginSapResponse } from '../entity';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { map } from 'rxjs/operators';
import { PowerBiRequest } from '../entity/PowerBiRequest';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [slideToTop()]
})
export class DashboardComponent implements OnInit {
  collapedSideBar: boolean;
  public screenHeight: number;
  @ViewChild('reportContainer', { static: true }) reportContainer: ElementRef;
  private Notificacao: NotificacaoComponent;
  private loading: SpinnerComponent;
  public reportId: any;
  reportName: string;
  private groupId: number[];
  private ids: number[] = [0, 0, 0, 0, 0, 0, 0];

  constructor(private dashboardservice: DashboardService, private Notifi: NotifierService,
              private spinner: NgxSpinnerService, private translate: LanguageTranslationModule,
              private Activatedroute: ActivatedRoute, private router: Router) {
    this.Notificacao = new NotificacaoComponent(Notifi);
    this.loading = new SpinnerComponent(spinner);
    this.reportId = this.Activatedroute.snapshot.queryParamMap.get('id') || 0;
  }

  ngOnInit() {
    // atualiza a rota dos documentos devido a ser a mesma página
    // tslint:disable-next-line: only-arrow-functions
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });

    this.screenHeight = (window.screen.height);
    this.MostrarPowerBi();
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

  MostrarPowerBi(): void {
    const User: LoginSapResponse = JSON.parse(localStorage.getItem('User'));
    const request: PowerBiRequest = new PowerBiRequest();
    request.Token = User.Token;
    request.Branch = User.Branch;
    request.ReportId = this.reportId;
    // const req: PowerBiRequest = new PowerBiRequest(this.reportId , User.Token, User.Branch) ;
    this.dashboardservice.RequestReport(request).subscribe((data) => {
      const configentity: EmbedConfigEntity = data;

      if (configentity.Id === '2c90de5e-96a5-4089-bbc9-1defc9df2b01') {
        this.reportName = 'Dashboard';
      } else {
        this.reportName = 'Relatorios';
      }

      if (configentity.ErroMessage != null) {
        this.loading.Fechar();
        this.Notificacao.showNotification('error', TraduzirErro(configentity.ErroMessage, this.translate));
        return;
      }

      const grupos = User.Groups[0];

      this.groupId = grupos.Groups.map(val => val.Id);
      // const tamanhoArray = this.groupId.length;
      console.log('ids', this.ids);
      console.log('groupId', this.groupId);

      for (let i = 0; i < this.groupId.length + 1; i++) {

        if (this.groupId[i] !== undefined) {
          this.ids[i] = this.groupId[i];
        }

      }

      this.ids = this.ids.filter(a => a > 0);
      console.log('ids', this.ids);

      let filtros;

      let branchAcess = 0;
      switch (User.Branch) {
        case '0001':
        case 'SMDX':
        case 'T001':
          branchAcess = 1;
          break;
        default:
          branchAcess = 0; break;
      }

      if (branchAcess === 1) {
        filtros = [{
          $schema: 'http://powerbi.com/product/schema#basic',
          target: {
            table: 'DadosCte',
            column: 'Branch'
          },
          filterType: 1,
          operator: 'In',
          values: [User.Branch]
        },
        {
          $schema: 'http://powerbi.com/product/schema#basic',
          target: {
            table: 'DocumentHeaders',
            column: 'Branch'
          },
          logicalOperator: 'And',
          conditions: [{
            operator: 'In',
            value: [User.Branch]
          }
          ]
        },
        {
          $schema: 'http://powerbi.com/product/schema#basic',
          target: {
            table: 'RelVolumetria',
            column: 'Branch'
          },
          filterType: 1,
          operator: 'In',
          values: [User.Branch]
        }
        ];
      } else {
        filtros = [{
          $schema: 'http://powerbi.com/product/schema#basic',
          target: {
            table: 'DadosCte',
            column: 'Branch'
          },
          filterType: 1,
          operator: 'In',
          values: [User.Branch]
        },
        {
          $schema: 'http://powerbi.com/product/schema#basic',
          target: {
            table: 'DocumentHeaders',
            column: 'Branch'
          },
          filterType: 1,
          operator: 'In',
          values: [User.Branch]
        },
        {
          $schema: 'http://powerbi.com/product/schema#basic',
          target: {
            table: 'RelVolumetria',
            column: 'Branch'
          },
          filterType: 1,
          operator: 'In',
          values: [User.Branch]
        },
        {
          $schema: 'http://powerbi.com/product/schema#basic',
          target: {
            table: 'Cliente',
            column: 'Branch'
          },
          filterType: 1,
          operator: 'In',
          values: [User.Branch]
        },
        {
          $schema: 'http://powerbi.com/product/schema#basic',
          target: {
            table: 'Groups',
            column: 'Id'
          },
          filterType: 1,
          operator: 'In',
          values: [this.ids[0], this.ids[1] === undefined ? 0 : this.ids[1],
          this.ids[2] === undefined ? 0 : this.ids[2], this.ids[3] === undefined ? 0 : this.ids[3],
          this.ids[4] === undefined ? 0 : this.ids[4], this.ids[5] === undefined ? 0 : this.ids[5]
            , this.ids[6] === undefined ? 0 : this.ids[6], this.ids[7] === undefined ? 0 : this.ids[7]
            , this.ids[8] === undefined ? 0 : this.ids[8], this.ids[9] === undefined ? 0 : this.ids[9]
            , this.ids[10] === undefined ? 0 : this.ids[10], this.ids[11] === undefined ? 0 : this.ids[11]
            , this.ids[12] === undefined ? 0 : this.ids[12], this.ids[13] === undefined ? 0 : this.ids[13]
            , this.ids[14] === undefined ? 0 : this.ids[14], this.ids[17] === undefined ? 0 : this.ids[17]
            , this.ids[15] === undefined ? 0 : this.ids[15], this.ids[18] === undefined ? 0 : this.ids[18]
            , this.ids[16] === undefined ? 0 : this.ids[16], this.ids[19] === undefined ? 0 : this.ids[19]
            , this.ids[20] === undefined ? 0 : this.ids[20], this.ids[21] === undefined ? 0 : this.ids[21]
            , this.ids[22] === undefined ? 0 : this.ids[22], this.ids[23] === undefined ? 0 : this.ids[23]
            ]
        }
        ];
      }

      const config = {
        type: 'report',
        tokenType: pbi.models.TokenType.Embed,
        id: configentity.Id,
        embedUrl: configentity.EmbedUrl,
        accessToken: configentity.EmbedToken.token,
        filters: filtros,
        settings: {
          filterPaneEnabled: false,
          navContentPaneEnabled: true,
          localeSettings: {
            language: 'pt-BR',
            formatLocale: 'pt-BR'
          }
        }

      };

      // console.log('config', config);

      const containerreport = this.reportContainer.nativeElement;
      const powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
      const report = powerbi.embed(containerreport, config);

      report.off('loaded');
      // report.on("loaded", () => {
      //   this.Notificacao.showNotification("info","Report Lido.");
      // });

      report.on('error', (erro) => {
        VerificarTpErro(this.router, 'Ocorreu um erro ao tentar carregar relatório.', this.Notificacao, this.translate);
      });


    },
      (err: HttpErrorResponse) => {
        VerificarTpErro(this.router, err, this.Notificacao, this.translate);
      });


  }
}
