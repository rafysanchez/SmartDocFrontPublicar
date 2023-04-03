/**
 * @description Componente do sistema 
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BnNgIdleService } from 'bn-ng-idle';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NotificacaoComponent, LanguageTranslationModule, TraduzirErro } from './pages/shared';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private Notificacao: NotificacaoComponent;
  constructor(private titleService: Title, private bnIdle: BnNgIdleService, private router: Router,
              private Notifi: NotifierService, private translate: LanguageTranslationModule) {
    // **Define o titulo das páginas */
    this.titleService.setTitle('SmartDocx Platform Web');

    this.Notificacao = new NotificacaoComponent(Notifi);

    // **Seta o timeout de sessão */
    this.bnIdle.startWatching(3600).subscribe((res) => {
      if (localStorage.getItem('User') !== null) {
        // tslint:disable-next-line:no-shadowed-variable
        this.bnIdle.startWatching(4600).subscribe((res) => {
          if (res) {
            this.Notificacao.showNotification('info', TraduzirErro('Sessão Expirada', this.translate));
            this.router.navigate(['login']);
          }
        });
      }
    });
  }

}
