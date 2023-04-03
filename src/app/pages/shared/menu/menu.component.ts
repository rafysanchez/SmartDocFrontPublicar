/**
 * @description Componente do menu da aplicação
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginSapResponse } from '../../entity';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  isActive: boolean;
  collapsed: boolean;
  showMenu: string;
  pushRightClass: string;
  User: LoginSapResponse;
  collapedSideBar: boolean;
  @Output() collapsedEvent = new EventEmitter<boolean>();
  constructor(public router: Router) {
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
    this.isActive = false;
    this.collapsed = false;
    this.showMenu = '';
    this.pushRightClass = 'push-right';
    this.User = JSON.parse(localStorage.getItem('User'));
  }

  AbrirPage(CaminhoNovo: string, Valor: any, Tp: any) {
    this.router.navigate([CaminhoNovo], { queryParams: { modelo: Valor, Tipo: Tp }, skipLocationChange: true });
  }

  eventCalled() {
    this.isActive = !this.isActive;
  }


  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.collapsedEvent.emit(this.collapsed);
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }

  changeLang(language: string) {
    return;
  }

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
  }
}
