/**
 * @description Componente do cadastro de cnpj
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CnpjService } from './cnpj.service';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageTranslationModule, NotificacaoComponent, SpinnerComponent, MyErrorStateMatcher, VerificarTpErro, ConfirmacaoService, TraduzirErro } from '../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginSapResponse, GrupoEntity, CustomerEntity } from '../entity';
import { slideToTop } from 'src/app/router.animations';
import { FormGroup, Validators, FormBuilder, } from '@angular/forms';
import { FuncoesGenericas } from '../shared/funcoes';
import { MatOption } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';


@Component({
  selector: 'app-cnpj',
  templateUrl: './cnpj.component.html',
  styleUrls: ['./cnpj.component.scss'],
  animations: [slideToTop()],
})
export class CnpjComponent implements OnInit {
  private Notificacao: NotificacaoComponent;
  private loading: SpinnerComponent;
  collapedSideBar: boolean;
  User: LoginSapResponse;
  registerForm: FormGroup;
  submitted = false;
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  Grupos: GrupoEntity[];
  IdCnpj: any;

  @ViewChild('allSelected', { static: false }) private allSelected: MatOption;
  @ViewChild('Cnpj', { static: true }) nameField: ElementRef;

  constructor(private cnpjservice: CnpjService, private Notifi: NotifierService,
              private spinner: NgxSpinnerService, private translate: LanguageTranslationModule,
              private Activatedroute: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder, private confirmationDialogService: ConfirmacaoService) {

    this.Notificacao = new NotificacaoComponent(Notifi);
    this.User = JSON.parse(localStorage.getItem('User'));
    this.loading = new SpinnerComponent(spinner);
    this.IdCnpj = this.Activatedroute.snapshot.queryParamMap.get('id') || 0;
  }

  ngOnInit() {
    this.RetGrupos();

    this.nameField.nativeElement.focus();
    this.registerForm = this.formBuilder.group({
      Cnpj: ['', [Validators.required, FuncoesGenericas.CnpjValido]],
      Name: ['', Validators.required],
      Description: [''],
      Active: [true, Validators.required],
      Groups: [Array<GrupoEntity>(), Validators.required],
      DtVencCert: ['', FuncoesGenericas.ValidDate]
    });

    // verifica se foi chamado para alteração de dados
    if (this.IdCnpj > 0) {
      this.RetDadosCnpj();
    }
  }
  get f() { return this.registerForm.controls; }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

  RetDadosCnpj(): void {
    this.loading.Mostrar();
    let Customer: CustomerEntity;
    const Customer2: CustomerEntity = new CustomerEntity();
    Customer2.Token = this.User.Token;
    Customer2.Id = this.IdCnpj;
    Customer2.Branch = this.User.Branch;

    this.cnpjservice.GetById(Customer2).subscribe((data) => {
      this.loading.Fechar();
      if (data != null) {
        Customer = data;
        this.registerForm.controls.Cnpj.setValue(FuncoesGenericas.FormatarStringCnpj(Customer.CNPJ.toString()));
        this.registerForm.controls.Name.setValue(Customer.Name);
        this.registerForm.controls.Description.setValue(Customer.Description);
        this.registerForm.controls.Active.setValue(Customer.Active);
        this.registerForm.controls.DtVencCert.setValue(moment(Customer.DtVencCert).format('L'));
        this.registerForm.controls.Groups.setValue(this.Grupos.filter(obj => {
          return Customer.Groups.map(item => item.Id).includes(obj.Id);
        }));
      } else {
        this.Notificacao.showNotification('info', TraduzirErro('MsgDadosErro', this.translate));
      }
    },
      (err: HttpErrorResponse) => {
        VerificarTpErro(this.router, err.error.ExceptionMessage, this.Notificacao, this.translate);
      });
  }

  /**
   * Método para retornar os grupos cadastrados na branch
   */
  RetGrupos(): void {
    const Grupo: GrupoEntity = new GrupoEntity();
    Grupo.Branch = this.User.Branch;
    Grupo.Active = true;
    Grupo.Token = this.User.Token;
    this.cnpjservice.RetGrupos(Grupo).subscribe((data) => {
      this.Grupos = data as GrupoEntity[];
    },
      (err: HttpErrorResponse) => {
        this.loading.Fechar();
        VerificarTpErro(this.router, err.error.ExceptionMessage, this.Notificacao, this.translate);
      });

  }


  tosslePerOne(all) {
    if (this.allSelected.selected) {
      this.allSelected.deselect();
      return false;
    }
    if (this.registerForm.controls.Groups.value.length === this.Grupos.length) {
      this.allSelected.select();
    }

  }

  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.registerForm.controls.Groups
        .patchValue([...this.Grupos.map(item => item), 0]);
    } else {
      this.registerForm.controls.Groups.patchValue([]);
    }
  }


  Voltar(): void {
    this.router.navigate(['principal/cnpjs']);
  }
  onSubmit() {
    this.submitted = true;
    if (!this.registerForm.valid) { return; }
    const Customer: CustomerEntity = this.registerForm.value;
    Customer.Branch = this.User.Branch;
    Customer.Token = this.User.Token;
    Customer.Id = this.IdCnpj;
    Customer.DtVencCert =
    new Date(this.registerForm.controls.DtVencCert.value.substring(4) + '-' 
    + this.registerForm.controls.DtVencCert.value.substring(2, 4) + '-' 
    + this.registerForm.controls.DtVencCert.value.substring(0, 2) + 'T00:00:00');

    this.confirmationDialogService.confirm('TitlePopSalvar', 'MsgSalvar')
      .then((confirmed) => {
        if (confirmed) {
          this.loading.Mostrar();
          this.cnpjservice.Save(Customer).subscribe((data) => {
            this.loading.Fechar();
            if (data != null) {
              this.Notificacao.showNotification('info', TraduzirErro('MsgDadosSalvos', this.translate));
              if (Customer.Id <= 0) {

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
