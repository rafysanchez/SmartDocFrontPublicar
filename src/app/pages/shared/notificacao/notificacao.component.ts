/**
 * @description Componente de notificação
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.scss']
})
export class NotificacaoComponent implements OnInit {
  private notifier: NotifierService;
  constructor(notifier: NotifierService) {
    this.notifier = notifier;
   }

  ngOnInit() {
  }

 /**
	 * Mostra as notificações
	 *
	 * @param {string} type    Tipo da notificação podem ser: default,info,success,warning,error
	 * @param {string} message Mensagem da notificação
	 */
	public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
	}

	/**
	 * Hide all notifications at once
	 */
	public hideAllNotifications(): void {
		this.notifier.hideAll();
	}

}
