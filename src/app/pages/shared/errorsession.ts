import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificacaoComponent } from './notificacao/notificacao.component';
import { LanguageTranslationModule } from './language-translation.module';
import { TraduzirErro } from './translate.message';

export function VerificarTpErro(router: Router, error: HttpErrorResponse | string, Notificacao: NotificacaoComponent, translate: LanguageTranslationModule) {
    let Tipo = typeof error;
    switch (Tipo.toString()) {
        case "object":
            switch ((error as HttpErrorResponse).status) {
                case 403:
                    Notificacao.showNotification("info", TraduzirErro("Sessão Expirada", translate));
                    router.navigate(["login"]);
                    break;
                default:
                    Notificacao.showNotification("error", (error as HttpErrorResponse).message);
                    break;
            }
            break;
        case "string":
            switch (error.toString()) {
                case "E-mail já pertence ao REG WEB":
                    Notificacao.showNotification("info", TraduzirErro("MsgEmailRegWeb", translate));
                    break;
                default:
                    Notificacao.showNotification("error", error.toString());
                    break;
            }
    }
}
