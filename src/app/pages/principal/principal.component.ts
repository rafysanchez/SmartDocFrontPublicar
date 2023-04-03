import { Component, OnInit } from '@angular/core';
import { slideToTop } from 'src/app/router.animations';
import { LanguageTranslationModule } from '../shared';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  animations: [slideToTop()]
})
export class PrincipalComponent implements OnInit {
  collapedSideBar: boolean;

  constructor(private translate: LanguageTranslationModule) {
    translate.TrocarLinguagem(localStorage.getItem('Linguagem') === null ? 'pt br' : localStorage.getItem('Linguagem'));
  }

  ngOnInit() {
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }
}
