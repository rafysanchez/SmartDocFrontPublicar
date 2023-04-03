/**
 * @description Componente do Home
 * @author Delio Darwin
 * @since 1.0.0
 */

import { Component, OnInit, Output } from '@angular/core';
import { slideToTop } from 'src/app/router.animations';
import { NotifierService } from 'angular-notifier';
import { LoginSapResponse } from '../entity';
import { NotificacaoComponent, LanguageTranslationModule, ConfirmacaoService, VerificarTpErro} from '../shared';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { HomeService } from './home.service';
import { HomeEntity } from './../entity/home.entity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [slideToTop()]
})
export class HomeComponent implements OnInit {
  rowData: string;
  private Notificacao: NotificacaoComponent;
  User: LoginSapResponse;
  single = 'single';

  @Output() totalNFe: string;
  @Output() totalNFS: string;
  @Output() totalCTe: string;
  @Output() totalNaoProcessado: string;

  public sliders: Array<any> = [];

  constructor(private homeService: HomeService, private Notifi: NotifierService,
              private spinner: NgxSpinnerService, private translate: LanguageTranslationModule,
              private router: Router) {

      this.Notificacao = new NotificacaoComponent(this.Notifi);
      this.User = JSON.parse(localStorage.getItem('User'));

      this.ChamarDados();

      this.sliders.push(
      {
        imagePath: '../../../assets/slider1.jpg',
        label: 'Smartdocx',
        text:  'é a plataforma digital de captura automática, armazenamento e gestão de documentos fiscais.'
      },
      {
        imagePath: '../../../assets/slider2.jpg',
        label: 'Não importa o layout da Prefeitura ou SEFAZ',
        text: 'Smartdox captura e organiza, reduzindo trabalho manual e custos operacionais.'
      }
/*      ,{
        imagePath: '../../../assets/slider3.jpg',
        label: 'Third slide label',
        text:
          'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
      } */
    );
  }

  ngOnInit() {}

  ChamarDados() {
    const homeconst: HomeEntity = new HomeEntity();
    homeconst.Branch = this.User.Branch;
    homeconst.Token = this.User.Token;

    this.homeService.GetIndicadores(homeconst).subscribe((data) => {
      const DadosRet: HomeEntity = data;

      this.totalNFe = Number(DadosRet.TotalNFe).toString().replace(',', '.');
      this.totalNFS = DadosRet.TotalNFSe;
      this.totalCTe = DadosRet.TotalCTe;
      this.totalNaoProcessado = DadosRet.TotalNaoProcessado;

      /* alert(this.totalNaoProcessado);
      console.log(data); */
    },
      (err: HttpErrorResponse) => {
        VerificarTpErro(this.router, err.error.ExceptionMessage, this.Notificacao, this.translate);
      });
  }

}
