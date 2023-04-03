/**
 * @description Módulo de linguagem do sistema
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/**
 * 
 * @param http Recebe o httpClient automaticamente do modulo principal
 */
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    TranslateModule
  ],

})
export class LanguageTranslationModule {
  /**
   * 
   * @param translate Serviço de tradução do ngx-translate
   */
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['pt br', 'en']);
    this.translate.setDefaultLang('pt br');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/pt br|en/) ? browserLang : 'pt br');
    localStorage.setItem('Linguagem', "pt br");
  }

  /**
   * 
   * @param Linguagem Recebe a linguagem que será utilizada no sistema e efetua a troca
   */
  public TrocarLinguagem(Linguagem: string): void {
    this.translate.setDefaultLang(Linguagem);
    this.translate.use(Linguagem);
    switch (Linguagem) {
      case "pt br":
        moment.locale('pt-BR');
        break;
     default:
        moment.locale(Linguagem);
        break;

    }

    localStorage.setItem('Linguagem', Linguagem);
  }

  public TransString(Chave: string): string {
    return this.translate.instant(Chave);
  }

  public RetornaLinguagem(): string {
    return this.translate.store.currentLang;
  }
}
