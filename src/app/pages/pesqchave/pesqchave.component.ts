/**
 * @description Componente de pesquisa por chave
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { slideToTop } from 'src/app/router.animations';
import {
  NotificacaoComponent, SpinnerComponent, LanguageTranslationModule,
  TraduzirErro, MyErrorStateMatcher, VerificarTpErro
} from '../shared';
import { LoginSapResponse } from '../entity';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RetArquivoEntity } from '../entity/retarquivo.entity';
import { forkJoin, of } from 'rxjs';
import { PesqchaveService } from './pesqchave.service';
import { catchError } from 'rxjs/operators';


export enum KEY_CODE {
  ENTER = 13,
  TAB = 9
}

@Component({
  selector: 'app-pesqchave',
  templateUrl: './pesqchave.component.html',
  styleUrls: ['./pesqchave.component.scss'],
  animations: [slideToTop()]
})


export class PesqchaveComponent implements OnInit {
  collapedSideBar: boolean;
  private Notificacao: NotificacaoComponent;
  private loading: SpinnerComponent;
  User: LoginSapResponse;
  registerForm: FormGroup;
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  Idioma = '';
  hidePdfViewer = true;
  Arquivo: RetArquivoEntity;

  @ViewChild('Chave', { static: true }) nameField: ElementRef;

  constructor(private pesqchaveservice: PesqchaveService, private Notifi: NotifierService,
    private spinner: NgxSpinnerService, private translate: LanguageTranslationModule,
    private router: Router, private formBuilder: FormBuilder) {

    this.Notificacao = new NotificacaoComponent(Notifi);
    this.User = JSON.parse(localStorage.getItem('User'));
    this.loading = new SpinnerComponent(spinner);

  }
  get f() { return this.registerForm.controls; }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // tslint:disable-next-line: deprecation
    switch (event.keyCode) {
      case KEY_CODE.ENTER:
      case KEY_CODE.TAB:
        this.RetChave();
        break;
    }
  }


  RetChave() {
    this.loading.Mostrar();
    this.hidePdfViewer = true;

    try {
      if (!this.registerForm.valid) { return; }
      // tslint:disable-next-line: max-line-length
      const PesChave = this.pesqchaveservice.RetDoc(this.User.Token, this.registerForm.controls.Chave.value).pipe(catchError(error => of(VerificarTpErro(this.router, error.error.ExceptionMessage, this.Notificacao, this.translate))));
      forkJoin([PesChave]).subscribe(results => {
        const Arquivos: RetArquivoEntity[] = results[0];

        if (Arquivos != null) {
          let Doc: RetArquivoEntity;
          // tslint:disable-next-line: only-arrow-functions
          Doc = Arquivos.filter(function (element) {
            if (element.NmFile != null) {
              if ((element.NmFile.indexOf('DACTE_') >= 0) || (element.NmFile.indexOf('DANFE_')) >= 0
                || (element.NmFile.indexOf('DOC_')) >= 0) {
                return element;
              }
            }
          })[0];

          if (Doc !== undefined) {
            this.Arquivo = Doc;
            switch (localStorage.getItem('Linguagem')) {
              case 'pt br':
                this.Idioma = 'pt-BR';
                break;
              case 'en':
                this.Idioma = 'en-US';
                break;
            }
            this.hidePdfViewer = false;
          } else {
            this.registerForm.controls.Chave.setValue('');
            this.nameField.nativeElement.focus();
            this.Notificacao.showNotification('warning', TraduzirErro('MsgDocNExiste', this.translate));
          }

        } else {
          this.registerForm.controls.Chave.setValue('');
          this.nameField.nativeElement.focus();
          this.Notificacao.showNotification('warning', TraduzirErro('MsgDocNEncontrado', this.translate));
        }
      });
    } catch (Error) {
      this.Notificacao.showNotification('error', Error);
    } finally {
      this.loading.Fechar();
    }

  }
  ngOnInit() {
    this.nameField.nativeElement.focus();
    this.registerForm = this.formBuilder.group({
      Chave: ['', Validators.required]
    });
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }
}
