import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { slideToTop } from 'src/app/router.animations';
import * as pbi from 'powerbi-client';
import { DashboardAdmService } from './dashboardAdm.service';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageTranslationModule, NotificacaoComponent, SpinnerComponent, TraduzirErro, VerificarTpErro } from '../shared';
import { HttpErrorResponse } from '@angular/common/http';
import { EmbedConfigEntity, LoginSapResponse } from '../entity';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-dashboardAdm',
  templateUrl: './dashboardAdm.component.html',
  styleUrls: ['./dashboardAdm.component.scss'],
  animations: [slideToTop()]
})
export class DashboardAdmComponent implements OnInit {
  collapedSideBar: boolean;
  public screenHeight: number;
  @ViewChild('reportContainer', { static: true }) reportContainer: ElementRef;
  private Notificacao: NotificacaoComponent;
  private loading: SpinnerComponent;
  public reportId: any;

  constructor(private dashboardAdmservice: DashboardAdmService, private Notifi: NotifierService,
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
    this.dashboardAdmservice.RequestReport(User.Token, this.reportId).subscribe((data) => {
      const configentity: EmbedConfigEntity = data;


      if (configentity.ErroMessage != null) {
        this.loading.Fechar();
        this.Notificacao.showNotification('error', TraduzirErro(configentity.ErroMessage, this.translate));
        return;
      }


      let filtros;

      let branchAcess = 0;
      if (User.Branch === '0001') {
          branchAcess = 1;
      } else if (User.Branch === 'SMDX') {
        branchAcess = 1;
      } else if (User.Branch === 'T001') {
        branchAcess = 1;
      } else {
        branchAcess = 0;
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
            value: 'T001'
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
