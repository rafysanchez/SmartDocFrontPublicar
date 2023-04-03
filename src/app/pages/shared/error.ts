import { Injectable, ErrorHandler } from '@angular/core';
import { NotificacaoComponent } from './notificacao/notificacao.component';
import { LanguageTranslationModule } from './language-translation.module';

/**
 * @description Classe de erro generica
 * @autohor Alexandre A Jacobino
 * @since 1.0.0
 */
@Injectable()
export class ErrosGerais implements ErrorHandler {

    constructor(private Notificacao: NotificacaoComponent, private translate: LanguageTranslationModule) {
    }

    handleError(error) {
        this.Notificacao.showNotification("error", error);

    }

}