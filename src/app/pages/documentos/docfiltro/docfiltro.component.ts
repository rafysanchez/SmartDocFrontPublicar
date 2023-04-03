import { Component, OnInit, Inject } from '@angular/core';
import { slideToTop } from 'src/app/router.animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CidadesEntity, DocumentosFiltrosEntity } from '../../entity';
import { TraduzirErro, FuncoesGenericas, MyErrorStateMatcher } from '../../shared';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-docfiltro',
  templateUrl: './docfiltro.component.html',
  styleUrls: ['./docfiltro.component.scss'],
  animations: [slideToTop()]
})
export class DocfiltroComponent implements OnInit {
  Cidades: Array<CidadesEntity>;
  Estado: any;
  registerForm: FormGroup;
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  get f() { return this.registerForm.controls; }

  constructor(public dialogRef: MatDialogRef<DocfiltroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(FormBuilder) public formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      CFOPstart: [''],
      NNFstart: [''],
      DTEMIstart: ['', FuncoesGenericas.ValidDate],
      CNPJEstart: ['', FuncoesGenericas.CnpjValido],
      CNPJDstart: ['', FuncoesGenericas.CnpjValido],
      CFOPend: [''],
      NNFend: [''],
      DTEMIend: ['', FuncoesGenericas.ValidDate],
      CNPJEend: ['', FuncoesGenericas.CnpjValido],
      CNPJDend: ['', FuncoesGenericas.CnpjValido],
      CMUNFIM: [''],
      Estados: ['']

    });

    this.registerForm.controls.CFOPstart.setValue(this.data.Dados.CFOPstart);
    this.registerForm.controls.NNFstart.setValue(this.data.Dados.NNFstart);
    this.registerForm.controls.DTEMIstart.setValue(this.data.Dados.DTEMIstart);
    this.registerForm.controls.CNPJEstart.setValue(this.data.Dados.CNPJEstart);
    this.registerForm.controls.CNPJDstart.setValue(this.data.Dados.CNPJDstart);
    this.registerForm.controls.CFOPend.setValue(this.data.Dados.CFOPend);
    this.registerForm.controls.NNFend.setValue(this.data.Dados.NNFend);
    this.registerForm.controls.DTEMIend.setValue(this.data.Dados.DTEMIend);
    this.registerForm.controls.CNPJEend.setValue(this.data.Dados.CNPJEend);
    this.registerForm.controls.CNPJDend.setValue(this.data.Dados.CNPJDend);
    this.registerForm.controls.CMUNFIM.setValue(this.data.Dados.CMUNFIM);
    this.registerForm.controls.Estados.setValue('');

  }

  Limpar() {
    this.registerForm.reset();
    this.data.Dados = new DocumentosFiltrosEntity();

  }
  SelEstado() {
    if (this.registerForm.controls.Estados.value !== undefined) {
      const EstadoFilto = this.data.Estados.filter(p => p.Id === this.registerForm.controls.Estados.value);
      this.Cidades = EstadoFilto[0].Cidades;
    } else {
      this.Cidades = new Array() as Array<CidadesEntity>;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  Pesquisar() {
    if (!this.registerForm.valid) {
      this.data.Notificacao.showNotification('warning', TraduzirErro('MsgDadosInvalidos', this.data.Translate));
      return;
    }

    if (this.registerForm.controls.CFOPstart.value !== '' && this.registerForm.controls.CFOPend.value === '') {
      this.data.Notificacao.showNotification('warning', TraduzirErro('MsgFiltroCfopAte', this.data.Translate));
      return;
    }

    if (this.registerForm.controls.CFOPstart.value === '' && this.registerForm.controls.CFOPend.value !== '') {
      this.data.Notificacao.showNotification('warning', TraduzirErro('MsgFiltroCfopDe', this.data.Translate));
      return;
    }

    if (this.registerForm.controls.NNFstart.value !== '' && this.registerForm.controls.NNFend.value === '') {
      this.data.Notificacao.showNotification('warning', TraduzirErro('MsgFiltroNfpAte', this.data.Translate));
      return;
    }

    if (this.registerForm.controls.NNFstart.value === '' && this.registerForm.controls.NNFend.value !== '') {
      this.data.Notificacao.showNotification('warning', TraduzirErro('MsgFiltroNfDe', this.data.Translate));
      return;
    }

    if (this.registerForm.controls.DTEMIstart.value !== '' && this.registerForm.controls.DTEMIend.value === '') {
      this.data.Notificacao.showNotification('warning', TraduzirErro('MsgFiltroDtEmiAte', this.data.Translate));
      return;
    }

    if (this.registerForm.controls.DTEMIstart.value === '' && this.registerForm.controls.DTEMIend.value !== '') {
      this.data.Notificacao.showNotification('warning', TraduzirErro('MsgFiltroDtEmiDe', this.data.Translate));
      return;
    }


    if (this.registerForm.controls.CNPJEstart.value !== '' && this.registerForm.controls.CNPJEend.value === '') {
      this.data.Notificacao.showNotification('warning', TraduzirErro('MsgFiltroCnpjEmiAte', this.data.Translate));
      return;
    }

    if (this.registerForm.controls.CNPJEstart.value === '' && this.registerForm.controls.CNPJEend.value !== '') {
      this.data.Notificacao.showNotification('warning', TraduzirErro('MsgFiltroCnpjEmiDe', this.data.Translate));
      return;
    }

    if (this.registerForm.controls.CNPJDstart.value !== '' && this.registerForm.controls.CNPJDend.value === '') {
      this.data.Notificacao.showNotification('warning', TraduzirErro('MsgFiltroCnpjDestAte', this.data.Translate));
      return;
    }

    if (this.registerForm.controls.CNPJDstart.value === '' && this.registerForm.controls.CNPJDend.value !== '') {
      this.data.Notificacao.showNotification('warning', TraduzirErro('MsgFiltroCnpjDestDe', this.data.Translate));
      return;
    }

    this.data.Dados.CFOPstart = this.registerForm.controls.CFOPstart.value;
    this.data.Dados.NNFstart = this.registerForm.controls.NNFstart.value;
    this.data.Dados.DTEMIstart = this.registerForm.controls.DTEMIstart.value;
    this.data.Dados.CNPJEstart = this.registerForm.controls.CNPJEstart.value;
    this.data.Dados.CNPJDstart = this.registerForm.controls.CNPJDstart.value;
    this.data.Dados.CFOPend = this.registerForm.controls.CFOPend.value;
    this.data.Dados.NNFend = this.registerForm.controls.NNFend.value;
    this.data.Dados.DTEMIend = this.registerForm.controls.DTEMIend.value;
    this.data.Dados.CNPJEend = this.registerForm.controls.CNPJEend.value;
    this.data.Dados.CNPJDend = this.registerForm.controls.CNPJDend.value;
    this.data.Dados.CMUNFIM = this.registerForm.controls.CMUNFIM.value;
    this.dialogRef.close(this.data.Dados);
  }
}
