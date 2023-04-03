import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmailService } from './email.service';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  LanguageTranslationModule, ConfirmacaoService, NotificacaoComponent, SpinnerComponent,
  MyErrorStateMatcher, VerificarTpErro, FuncoesGenericas, TraduzirErro
} from '../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { slideToTop } from 'src/app/router.animations';
import { LoginSapResponse, CustomerEntity, EmailEntity } from '../entity';
import { MatOption } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  animations: [slideToTop()]
})
export class EmailComponent implements OnInit {
  private Notificacao: NotificacaoComponent;
  private loading: SpinnerComponent;
  collapedSideBar: boolean;
  User: LoginSapResponse;
  registerForm: FormGroup;
  submitted = false;
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  Customers: CustomerEntity[];
  Cnpjs: CustomerEntity[];
  IdEmail: any;
  @ViewChild('Email', { static: true }) nameField: ElementRef;
  @ViewChild('allSelected', { static: false }) private allSelected: MatOption;

  constructor(private emailservice: EmailService, private Notifi: NotifierService,
              private spinner: NgxSpinnerService, private translate: LanguageTranslationModule,
              private Activatedroute: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder, private confirmationDialogService: ConfirmacaoService) {

    this.Notificacao = new NotificacaoComponent(Notifi);
    this.User = JSON.parse(localStorage.getItem('User'));
    this.loading = new SpinnerComponent(spinner);
    this.IdEmail = this.Activatedroute.snapshot.queryParamMap.get('id') || 0;
  }

  ngOnInit() {
    this.nameField.nativeElement.focus();
    this.registerForm = this.formBuilder.group({
      Mail: ['', [Validators.required, Validators.email]],
      Service: ['', Validators.required],
      Protocol: ['', Validators.required],
      Port: [''],
      User: [''],
      Password: [''],
      Active: [true, Validators.required],
      SSL: [true],
      CustomerId: ['', Validators.required],
      ClientId: [''],
      ClientSecret: [''],
      TenantId: ['']
    });
    this.ChamarFuncoes();

  }

  ChamarFuncoes() {
    const Customer: CustomerEntity = new CustomerEntity();
    Customer.Branch = this.User.Branch;
    Customer.Active = true;
    Customer.Token = this.User.Token;
    Customer.Todos = true;
    let Cnpj: Observable<any>;

    if (this.IdEmail > 0) {
      Cnpj = this.emailservice.RequestCnpjs(Customer).pipe(catchError(error => of(VerificarTpErro(this.router, error.error.ExceptionMessage,
          this.Notificacao, this.translate))));
    } else {
      Customer.Todos = false;
      Cnpj = this.emailservice.RequestCnpjs(Customer).pipe(catchError(error => of(VerificarTpErro(this.router, error.error.ExceptionMessage,
          this.Notificacao, this.translate))));
    }

    const Email = this.emailservice.GetById(this.User.Token, this.IdEmail, this.User.Branch)
      .pipe(catchError(error => of(VerificarTpErro(this.router, error.error.ExceptionMessage, this.Notificacao, this.translate))));

    forkJoin([Cnpj, Email]).subscribe(results => {
      this.Cnpjs = results[0];
      // tslint:disable-next-line: no-shadowed-variable
      const Email: EmailEntity = results[1];

      if (Email != null) {
        this.registerForm.controls.Mail.setValue(Email.Mail);
        this.registerForm.controls.Service.setValue(Email.Service);
        this.registerForm.controls.Protocol.setValue(Email.Protocol);
        this.registerForm.controls.Port.setValue(Email.Port);
        this.registerForm.controls.User.setValue(Email.User);
        this.registerForm.controls.Password.setValue(Email.Password);
        this.registerForm.controls.Active.setValue(Email.Active);
        this.registerForm.controls.SSL.setValue(Email.SSL);
        this.registerForm.controls.CustomerId.disable();
        this.registerForm.controls.CustomerId.setValue(Email.CustomerId);
        // office 365
        this.registerForm.controls.ClientId.setValue(Email.ClientId);
        this.registerForm.controls.ClientSecret.setValue(Email.ClientSecret);
        this.registerForm.controls.TenantId.setValue(Email.TenantId);

      }


    });

  }

  Voltar(): void {
    this.router.navigate(['principal/emails']);
  }

  MontarNomeCli(Cnpj: string, Nome: string): string {
    return FuncoesGenericas.FormatarStringCnpj(Cnpj) + ' - ' + Nome;
  }

  get f() { return this.registerForm.controls; }


  tosslePerOne(all) {
    if (this.allSelected.selected) {
      this.allSelected.deselect();
      return false;
    }
    if (this.registerForm.controls.Customer.value.length === this.Customers.length) {
      this.allSelected.select();
    }

  }

  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.registerForm.controls.Customer
        .patchValue([...this.Customers.map(item => item), 0]);
    } else {
      this.registerForm.controls.Customer.patchValue([]);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (!this.registerForm.valid) { return; }
    const Email: EmailEntity = this.registerForm.value;
    Email.CustomerId = this.registerForm.controls.CustomerId.value;
    Email.Branch = this.User.Branch;
    Email.Id = this.IdEmail;
    Email.User = (this.registerForm.controls.User.value) ? this.registerForm.controls.User.value : 'aa' ;
    Email.Password = (this.registerForm.controls.Password.value) ? this.registerForm.controls.Password.value  : 'xx' ;
    Email.Port = (this.registerForm.controls.Port.value) ? this.registerForm.controls.Port.value : '0' ;
    Email.Protocol = (this.registerForm.controls.Protocol.value) ? this.registerForm.controls.Protocol.value : '0' ;
    Email.Service = (this.registerForm.controls.Service.value) ? this.registerForm.controls.Service.value : 'aa' ;
    Email.Token = this.User.Token;
    this.confirmationDialogService.confirm('TitlePopSalvar', 'MsgSalvar')
      .then((confirmed) => {
        if (confirmed) {
          this.loading.Mostrar();
          this.emailservice.Save(Email).subscribe((data) => {
            this.loading.Fechar();
            if (data) {
              this.Notificacao.showNotification('info', TraduzirErro('MsgDadosSalvos', this.translate));
              if (Email.Id <= 0) {

                this.ngOnInit();
              } else {
                this.Voltar();
              }
            } else {
              this.Notificacao.showNotification('info', TraduzirErro('MsgDadosErro', this.translate));
            }
          },
            (err: HttpErrorResponse) => {
              this.loading.Fechar();
              VerificarTpErro(this.router, err.error.ExceptionMessage, this.Notificacao, this.translate);
            });

        }
      });
  }
}
