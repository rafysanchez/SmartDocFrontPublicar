/**
 * @description Componente do Log de Eventos
 * @author Delio Darwin
 * @since 1.0.0
 */

import {Component, QueryList, ViewChildren, Directive} from '@angular/core';
import {Observable} from 'rxjs';
import { slideToTop } from 'src/app/router.animations';
import { NotificacaoComponent, SpinnerComponent, LanguageTranslationModule, ConfirmacaoService, VerificarTpErro } from '../shared';
import { LoginSapResponse, DocumentosEmailEntity, DocumentosEmailFiltrosEntity } from '../entity';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmailErrorService } from './emailerror.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-emailerror',
  templateUrl: './emailerror.component.html',
  styleUrls: ['./emailerror.component.scss'],
  animations: [slideToTop()]
})


export class EmailErrorComponent {
  private Notificacao: NotificacaoComponent;
  private loading: SpinnerComponent;
  private dataRetorno: any[] = [];
  public paginaAtual = 1;
  registerForm: FormGroup;
  get f() { return this.registerForm.controls; }
  User: LoginSapResponse;
  single = 'single';
  rowData: Observable<any>;
  datas = this.dataRetorno;

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  readonly DT_FORMAT = 'MM/DD/YYYY';


    // Configuração da ordenação
    public key = 'nome'; // Define um valor padrão, para quando inicializar o componente
    public reverse = false;
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }

  constructor(public emailerrorservice: EmailErrorService, private Notifi: NotifierService,
              private spinner: NgxSpinnerService, private translate: LanguageTranslationModule,
              private router: Router, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,
              private formBuilder: FormBuilder, ) {


      this.registerForm = this.formBuilder.group({
        Email: ['']
     });

      this.Notificacao = new NotificacaoComponent(this.Notifi);
      this.User = JSON.parse(localStorage.getItem('User'));
      this.loading = new SpinnerComponent(this.spinner);

  /*     this.fromDate = calendar.getToday();
      this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);*/
      this.fromDate = calendar.getNext(calendar.getToday(), 'y', -2);
      this.toDate = calendar.getToday();

      this.ChamarDados();
    }

    format(date: NgbDateStruct): string {
      if (!date) { return ''; }
      const mdt = moment([date.year, date.month - 1, date.day]);
      if (!mdt.isValid()) { return ''; }
      return mdt.format(this.DT_FORMAT);
  }

    onDateSelection(date: NgbDate) {
      if (!this.fromDate && !this.toDate) {
        this.fromDate = date;
      } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
        this.toDate = date;
      } else {
        this.toDate = null;
        this.fromDate = date;
      }
    }

    isHovered(date: NgbDate) {
      return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
    }

    isInside(date: NgbDate) {
      return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
    }

    isRange(date: NgbDate) {
      return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
    }

    validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
      const parsed = this.formatter.parse(input);
      return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
    }


  ChamarDados() {
    const intmailconst: DocumentosEmailFiltrosEntity = new DocumentosEmailFiltrosEntity();
    intmailconst.Branch = this.User.Branch;
    // tslint:disable-next-line:max-line-length
    intmailconst.DTENVstart = this.fromDate.year.toString() + '-' + ('0' + this.fromDate.month).slice(-2).toString() + '-' + ('0' + this.fromDate.day).slice(-2).toString();
    // tslint:disable-next-line:max-line-length
    intmailconst.DTENVend =  this.toDate.year.toString() + '-' +  ('0' + this.toDate.month).slice(-2).toString() + '-' +  ('0' + this.toDate.day).slice(-2).toString();
    intmailconst.SENDE = this.registerForm.controls.Email.value;
    intmailconst.Token = this.User.Token;
    this.loading.Mostrar();

    this.emailerrorservice.RequestDocumentEmail(intmailconst).subscribe((data) => {
      this.rowData = data;
      this.dataRetorno = data;
    },
      (err: HttpErrorResponse) => {
        VerificarTpErro(this.router, err.error.ExceptionMessage, this.Notificacao, this.translate);
      });
    this.loading.Fechar();
  }
}
