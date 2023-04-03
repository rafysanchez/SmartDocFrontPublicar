/**
 * @description Componente do cabeçalho de página
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Component, OnInit } from '@angular/core';
import { LoginSapResponse } from '../../entity';
import { Router, NavigationEnd } from '@angular/router';
import { LanguageTranslationModule } from '../language-translation.module';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss']

})
export class CabecalhoComponent implements OnInit {
  // tslint:disable-next-line:jsdoc-format
  /**@description Variáveis */
  User: LoginSapResponse;
  public pushRightClass: string;

  constructor(public router: Router, private translate: LanguageTranslationModule) {

    this.router.events.subscribe(val => {
      if (
        val instanceof NavigationEnd &&
        window.innerWidth <= 992 &&
        this.isToggled()
      ) {
        this.toggleSidebar();
      }
    });

  }

  ngOnInit() {
    this.pushRightClass = 'push-right';
    this.User = JSON.parse(localStorage.getItem('User'));
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }

  isToggled(): boolean {
    this.pushRightClass = 'push-left';
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  changeLang(language: string) {
    this.translate.TrocarLinguagem(language);
  }
}
