import { KEY_CODE } from './../pesqchave/pesqchave.component';
import { FuncionalidadesEntity } from './../entity/funcionalidades.entity';

import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  LanguageTranslationModule, NotificacaoComponent, SpinnerComponent,
  VerificarTpErro, FuncoesGenericas, MyErrorStateMatcher, TraduzirErro, GridComponent
} from '../shared';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DocumentosService } from './documentos.service';
import { slideToTop } from 'src/app/router.animations';
import {
  LoginSapResponse, DocumentosFiltrosEntity, GridLayoutFilterEntity,
  GridLayoutRetEntity, CustomerEntity, EstadosEntity, GridLayoutEntity, GridLayoutFieldEntity,
  SapRequestEntity, SapResponseEntity, AgGridParamEntity, DocumentosAnnotationsEntity
} from '../entity';
import { of, forkJoin, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as moment from 'moment';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DocfiltroComponent } from './docfiltro/docfiltro.component';
import { DragdropComponent } from './dragdrop/dragdrop.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
import { IGetRowsParams } from 'ag-grid-community';
import { agGridReturnEntity } from '../entity/agGridReturn';
import { HttpErrorResponse } from '@angular/common/http';
import { stringify } from 'querystring';
import { ManifestacaoComponent } from './manifestacao/manifestacao.component';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss'],
  animations: [slideToTop()]
})
export class DocumentosComponent implements OnInit, OnDestroy {
  modelo: any;
  tipoDoc: any;
  modeloPage: any;
  private Notificacao: NotificacaoComponent;
  private loading: SpinnerComponent;
  columnDefs;
  rowData: any;
  User: LoginSapResponse;
  ColunasGrid: GridLayoutRetEntity[];
  Cnpjs: CustomerEntity[];
  Layouts: any;
  LayoutsAll: GridLayoutRetEntity[];
  Selecionado: any;
  ColunasDisp: GridLayoutRetEntity[];
  ColunasUti: GridLayoutRetEntity[];
  Estados: EstadosEntity[];
  VerificaAnotacao: boolean;
  registerForm: FormGroup;
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  FiltroAvancado: DocumentosFiltrosEntity = new DocumentosFiltrosEntity();
  SelDocsId: Array<any> = new Array<any>();
  activatedRoute: ActivatedRoute;
  paramMapSubscription: Subscription;
  get f() { return this.registerForm.controls; }
  multiple = 'multiple';
  ExisteMani: boolean;
  readGrid: any;
  paramsGrid: any;
  params: any;

  constructor(private documentosservice: DocumentosService, private Notifi: NotifierService,
    // tslint:disable-next-line: align
    private spinner: NgxSpinnerService, private translate: LanguageTranslationModule,
    private Activatedroute: ActivatedRoute, private router: Router, public dialog: MatDialog,
    private formBuilder: FormBuilder, private snackBar: MatSnackBar) {

    this.Notificacao = new NotificacaoComponent(Notifi);
    this.activatedRoute = Activatedroute;
    this.loading = new SpinnerComponent(spinner);
    this.modelo = this.Activatedroute.snapshot.queryParamMap.get('modelo') || 0;
    this.tipoDoc = this.Activatedroute.snapshot.queryParamMap.get('Tipo') || 0;
    this.modeloPage = ' - ' + this.modelo;
    this.User = JSON.parse(localStorage.getItem('User'));
    this.readGrid = this.onGridReady.bind(this);

    // verifica de existe manifestação e mostra na tela
    this.ExisteMani = this.User.Manifestacoes != null ? true : false;
  }

  ngOnInit(): void {
    this.configureRouter();
    this.registerForm = this.formBuilder.group({
      Customer: [''],
      Layout: [''],
      Manifestacoes: [''],
      Chave: [''],
      DtEmiDe: ['', FuncoesGenericas.ValidDate],
      DtEmiAte: ['', FuncoesGenericas.ValidDate],
      CnpjEmi: ['', FuncoesGenericas.CnpjValido],
      CnpjDest: ['', FuncoesGenericas.CnpjValido],
      NNF: ['']
    });
    this.PossuiAnotacao();
    this.ChamarDados();
  }


  private configureRouter(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnDestroy(): void {

    // tslint:disable-next-line:no-unused-expression
    (this.paramMapSubscription) && this.paramMapSubscription.unsubscribe();

  }


  openSnackBar(Msg: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 5 * 1000,
      data: Msg
    });
  }

  Limpar() {
    this.registerForm.controls.Chave.setValue('');
    this.registerForm.controls.DtEmiDe.setValue('');
    this.registerForm.controls.DtEmiAte.setValue('');
    this.registerForm.controls.CnpjEmi.setValue('');
    this.registerForm.controls.CnpjDest.setValue('');
    this.registerForm.controls.NNF.setValue('');
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.controls[key].setErrors(null);
    });

    this.onSubmit();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DocfiltroComponent, {
      width: '1020px',
      data: {
        Estados: this.Estados,
        Dados: this.FiltroAvancado,
        Notificacao: this.Notificacao,
        Translate: this.translate,
        Modelo: this.modelo
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.FiltroAvancado = result;
        this.FiltroAvancado.Branch = this.User.Branch;
        this.FiltroAvancado.IdUser = this.User.UserLogged.Id;
        this.FiltroAvancado.MODELO = this.modelo;
        this.FiltroAvancado.DocumentType = this.modelo;
        this.FiltroAvancado.TPNF = this.tipoDoc;
        this.FiltroAvancado.Token = this.User.Token;
        this.PesquisarDados(this.FiltroAvancado);
      }
    });
  }

  AbriDialogManifestacao(): void {
    const dialogRef = this.dialog.open(ManifestacaoComponent, {
      width: '300px',
      data: {
        name: 'austin'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result !== undefined) {
        const xx = result;
        console.log(xx);
      }
    });


  }



  AbrirLayout(): void {
    this.AjustarLayout();
    const NomeLayout = this.Layouts.find(p => p.Id === this.registerForm.controls.Layout.value);
    const dialogRef = this.dialog.open(DragdropComponent, {
      width: '700px',
      data: {
        ColunasDisp: this.ColunasDisp,
        ColunasTot: this.ColunasUti,
        NmLayout: NomeLayout.Nome,
        IdLayout: NomeLayout.Id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) { return null; }
      if (result === null) { return null; }

      if (result.Acao === 'E') {
        // verifica se pode excluir os layouts
        if (this.Layouts.length - 1 <= 0) {
          this.Notificacao.showNotification('info', TraduzirErro('MsgNoExLayout', this.translate));
          return;
        }

        // tslint:disable-next-line:max-line-length
        const Layout = this.documentosservice.DelLayout(this.User.Token, result.Id).pipe(catchError(error => of(VerificarTpErro(this.router, error.error.ExceptionMessage, this.Notificacao, this.translate))));
        forkJoin([Layout]).subscribe(results => {
          if (results[0]) {
            this.Selecionado = '';
            this.Notificacao.showNotification('info', TraduzirErro('MgsDadosExcluidos', this.translate));
            this.AtuLayoutDados();
          }
        });
      } else {
        const Dados: GridLayoutEntity = new GridLayoutEntity();
        Dados.GridLayoutGridFields = new Array<GridLayoutFieldEntity>();
        Dados.Branch = this.User.Branch;
        Dados.User_Id = this.User.UserLogged.Id;
        Dados.Name = result.Nome;
        let Ordem = 1;

        // tslint:disable-next-line:forin
        for (let i = 0; i <= result.Dados.length - 1; i++) {
          const Grid: GridLayoutFieldEntity = new GridLayoutFieldEntity();
          // tslint:disable-next-line:radix
          Grid.ColumnsTableTypes_Id = result.Dados[i].ColumnsTableTypes_Id;
          Grid.Ordenacao = Ordem;
          Dados.GridLayoutGridFields.push(Grid);
          Ordem++;
        }

        // verifica se o nome do grid é o mesmo que retornou
        if (Dados.Name === NomeLayout.Nome) {
          Dados.Id = NomeLayout.Id;
        }

        // tslint:disable-next-line:max-line-length
        const Layout = this.documentosservice.SalvarLayout(this.User.Token, Dados).pipe(catchError(error => of(VerificarTpErro(this.router, error.error.ExceptionMessage, this.Notificacao, this.translate))));
        forkJoin([Layout]).subscribe(results => {
          if (results[0] !== undefined) {
            this.Notificacao.showNotification('info', TraduzirErro('MsgDadosSalvos', this.translate));
            this.Selecionado = results[0].Id;
            this.AtuLayoutDados();
          }
        });
      }
    });
  }

  AtuLayoutDados() {
    const LayoutsFiltro: GridLayoutFilterEntity = new GridLayoutFilterEntity();
    LayoutsFiltro.Modelo = this.modelo;
    LayoutsFiltro.Table = 'DocumentHeaders';
    LayoutsFiltro.UserId = this.User.UserLogged.Id;
    LayoutsFiltro.Branch = this.User.Branch;

    const LayoutsUserFiltro: GridLayoutFilterEntity = new GridLayoutFilterEntity();
    LayoutsUserFiltro.UserId = this.User.UserLogged.Id;
    LayoutsUserFiltro.Branch = this.User.Branch;
    LayoutsUserFiltro.Modelo = this.modelo;
    LayoutsUserFiltro.Table = 'DocumentHeaders';

    // tslint:disable-next-line: max-line-length
    const Layouts = this.documentosservice.GetLayoutsGrid(this.User.Token, LayoutsUserFiltro).pipe(catchError(error => of(VerificarTpErro(this.router, error.error.ExceptionMessage, this.Notificacao, this.translate))));
    // tslint:disable-next-line: max-line-length
    const LayoutsAll = this.documentosservice.GetLayoutsGrid(this.User.Token, LayoutsFiltro).pipe(catchError(error => of(VerificarTpErro(this.router, error.error.ExceptionMessage, this.Notificacao, this.translate))));
    // tslint:disable-next-line:no-shadowed-variable
    forkJoin([LayoutsAll, Layouts]).subscribe(results => {
      this.rowData = null;
      this.columnDefs = null;
      this.LayoutsAll = results[0];
      this.ColunasGrid = results[1];

      let ColunasSel: any;
      if (this.Selecionado === '') {
        this.Selecionado = this.ColunasGrid[0].Id;
      }
      ColunasSel = this.ColunasGrid.filter(obj => obj.Id === this.Selecionado);
      this.columnDefs = this.CriarColunas(ColunasSel);
      this.AjustarLayout();
      this.onSubmit();
      this.Selecionado = ColunasSel[0].Id;
    });
  }

  onGridReady(params) {
    this.paramsGrid = params.api;
    this.params = params;
    // this.RequestCustomers();
    const datasource = {
      getRows: (params2: IGetRowsParams) => {
        const GridParam: AgGridParamEntity = new AgGridParamEntity();
        GridParam.startRow = params2.startRow;
        GridParam.endRow = params2.endRow;
        GridParam.filterModel = JSON.stringify(params2.filterModel);
        GridParam.sortModel = params2.sortModel;

        const DocumentosFiltro: DocumentosFiltrosEntity = new DocumentosFiltrosEntity();
        DocumentosFiltro.Branch = this.User.Branch;
        DocumentosFiltro.IdUser = this.User.UserLogged.Id;
        DocumentosFiltro.DocumentType = this.modelo;
        DocumentosFiltro.MODELO = this.modelo;
        DocumentosFiltro.TPNF = this.tipoDoc;
        DocumentosFiltro.Token = this.User.Token;
        GridParam.filterData = DocumentosFiltro;

        this.documentosservice.GetDocsAg(GridParam).subscribe((data) => {
          const retorno = data as agGridReturnEntity;
          this.rowData = retorno.rows;
          params2.successCallback(this.rowData, retorno.lastRow);
        },
          (err: HttpErrorResponse) => {
            VerificarTpErro(this.router, err.error.ExceptionMessage, this.Notificacao, this.translate);
          });

      }
    };

    this.paramsGrid.setDatasource(datasource);
  }

  PossuiAnotacao() {
    this.documentosservice.VerificaAnotacao(this.User.Token, this.User.UserLogged.Id.toString()).subscribe((data) => {
      const retorno = data;
      if (data === true) {
        this.VerificaAnotacao = true;
      }
    },
      (err: HttpErrorResponse) => {
        VerificarTpErro(this.router, err.error.ExceptionMessage, this.Notificacao, this.translate);
      });
  }

  SaveAnnotations(e) {
    const Anotacao: DocumentosAnnotationsEntity = this.registerForm.value;
    Anotacao.Branch = this.User.Branch;
    Anotacao.DocumentHeader_Id = e.data.Id;
    Anotacao.Anotacao = e.newValue;
    let Mensagem: string;

    if (e.oldValue !== e.newValue) {
      this.documentosservice.SaveAnnotations(this.User.Token, Anotacao).subscribe((data) => {
        if (data === true) {
          if (e.oldValue === undefined || e.oldValue === null) {
            Mensagem = 'Anotação incluída!';
          } else {
            if (e.newValue === '' || e.newValue === null) {
              Mensagem = 'Anotação excluída!';
            } else {
              Mensagem = 'Anotação alterada!';
            }
          }
          this.openSnackBar(Mensagem);
        }
      },
        (err: HttpErrorResponse) => {
          this.loading.Fechar();
          VerificarTpErro(this.router, err, this.Notificacao, this.translate);
        });
    }
  }

  ChamarDados() {
    debugger;
    const LayoutsUserFiltro: GridLayoutFilterEntity = new GridLayoutFilterEntity();
    LayoutsUserFiltro.UserId = this.User.UserLogged.Id;
    LayoutsUserFiltro.Branch = this.User.Branch;
    LayoutsUserFiltro.Modelo = this.modelo;
    LayoutsUserFiltro.Table = 'DocumentHeaders';

    const LayoutsFiltro: GridLayoutFilterEntity = new GridLayoutFilterEntity();
    LayoutsFiltro.Modelo = this.modelo;
    LayoutsFiltro.Table = 'DocumentHeaders';
    LayoutsFiltro.UserId = this.User.UserLogged.Id;
    LayoutsFiltro.Branch = this.User.Branch;

    const ClientesFiltro: CustomerEntity = new CustomerEntity();
    ClientesFiltro.Branch = this.User.Branch;

    // tslint:disable-next-line: max-line-length
    const Layouts = this.documentosservice.GetLayoutsGrid(this.User.Token, LayoutsUserFiltro).pipe(catchError(error => of(VerificarTpErro(this.router, error.error.ExceptionMessage, this.Notificacao, this.translate))));
    // tslint:disable-next-line: max-line-length
    const LayoutsAll = this.documentosservice.GetLayoutsGrid(this.User.Token, LayoutsFiltro).pipe(catchError(error => of(VerificarTpErro(this.router, error.error.ExceptionMessage, this.Notificacao, this.translate))));
    // tslint:disable-next-line: max-line-length
    const Cliente = this.documentosservice.GetCnpj(this.User.Token, ClientesFiltro).pipe(catchError(error => of(VerificarTpErro(this.router, error.error.ExceptionMessage, this.Notificacao, this.translate))));
    // tslint:disable-next-line: max-line-length
    const Estado = this.documentosservice.GetEstados(this.User.Token).pipe(catchError(error => of(VerificarTpErro(this.router, error.error.ExceptionMessage, this.Notificacao, this.translate))));

    // forkJoin([Documentos, Layouts, Cliente, LayoutsAll, Estado]).subscribe(results => {
    forkJoin([Layouts, Cliente, LayoutsAll, Estado]).subscribe(results => {
      // this.rowData = results[0];
      debugger;
      this.ColunasGrid = results[0];
      this.LayoutsAll = results[2];
      this.Estados = results[3];

      // verifica se o user logado é admin e mostra todos os clientes
      if (this.User.UserLogged.IsAdmin) {
        this.Cnpjs = results[1];
      } else {
        this.Cnpjs = results[1].filter(obj => this.User.Groups.map(item => item.Id).includes(obj.Id));
      }
      this.AjustarLayout();
      // // tslint:disable-next-line:max-line-length
      const ColunasSel = this.ColunasGrid.filter(obj => obj.Id === this.Selecionado);
      // // Cria o grid com as colunas do layout selecionado
      this.columnDefs = this.CriarColunas(ColunasSel);
      this.Selecionado = ColunasSel[0].Id;
    });
  }

  /**
   * @description Método para envio de manifestações
   */
  SendMani() {


    const dialogRef = this.dialog.open(ManifestacaoComponent, {
      width: '300px',
      data: {
        name: this.registerForm.controls.Manifestacoes.value.TipoManifestacao
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log('result', result);

      if (result !== 'cancelou') {
        // console.log('retDialog', retDialog);

        const retDialog = result.WEBSE;
        console.log('result', result.WEBSE);
        /* console.log('retDialog', retDialog);
        console.log('pega: ',this.registerForm.controls.Manifestacoes.value);
        var pega = this.registerForm.controls.Manifestacoes.value;

        if(retDialog.length>5){
      console.log('maior que 5', retDialog);
      console.log('pega', pega.TipoManifestacao);
    } */

        // codigo antigo
        if (this.registerForm.controls.Manifestacoes.value !== undefined) {
          if (this.SelDocsId.length <= 0) {
            this.Notificacao.showNotification('warning', TraduzirErro('MsgSelMani', this.translate));
            return;
          }
          // verifica se o documento tem ideme e indoc
          const Dados: Array<any> = this.rowData.filter(obj => this.SelDocsId.map(item => item.Id).includes(obj.Id));
          const DocsMani = Dados.filter(element => {
            if (element.IDEME !== '' && element.INDOC !== '') {
              return element;
            }
          });

          let Msg = '';
          const SapRequest: SapRequestEntity = new SapRequestEntity();
          SapRequest.Branch = this.User.Branch;
          SapRequest.MANDT = 'G';
          SapRequest.SERVI = this.registerForm.controls.Manifestacoes.value.TipoManifestacao;

          if (result.WEBSE.length > 5) {
            SapRequest.WEBSE = result.WEBSE;
          }


          if (DocsMani === undefined) {
            this.Notificacao.showNotification('warning', TraduzirErro('MsgNotMani', this.translate));
            return;
          }
          SapRequest.PROTO = '';
          DocsMani.forEach(value => {
            SapRequest.PROTO += value.IDEME + value.INDOC + ';';
            Msg += value.NNF + ',';
          });
          Msg = Msg.substring(0, Msg.length - 1);

          // tslint:disable-next-line: max-line-length
          const Manifestacoes = this.documentosservice.SendMani(this.User.Token, SapRequest).pipe(catchError(error => of(VerificarTpErro(this.router, error.error.ExceptionMessage, this.Notificacao, this.translate))));
          forkJoin([Manifestacoes]).subscribe(results => {
            const SapResult: SapResponseEntity = results[0];

            if (SapResult !== undefined) {
              if (SapResult.isOk) {
                this.Notificacao.showNotification('info', TraduzirErro('MsgOkMani', this.translate));
                this.openSnackBar('Documentos: ' + Msg + ' manifestados com sucesso.');
                this.registerForm.controls.Manifestacoes.setValue('');
              } else {
                this.Notificacao.showNotification('error', SapResult.Message);
              }
            }

          });

        }
      }
      // fim codigo antigo


    });




  }

  /**
   * @description Alterar o layout do grid quando o usuário seleciona
   * @param Id Id do layout selecionado
   */
  MudarLayout() {
    this.rowData = null;
    this.columnDefs = null;
    const LayoutSel = this.Layouts.find(p => p.Id === this.registerForm.controls.Layout.value);
    this.Selecionado = LayoutSel.Id;
    const ColunasSel = this.ColunasGrid.filter(obj => obj.Id === this.Selecionado);
    this.columnDefs = this.CriarColunas(ColunasSel);
    this.AjustarLayout();
    this.onSubmit();
  }

  /**
   * @description Função para ajustar as colunas do layou e o combo do mesmo
   */
  AjustarLayout() {
    // filtra os nomes dos layouts do usuário
    this.Layouts = Array.from(new Set(this.ColunasGrid.map(s => s.Id))).map(id => {
      return {
        Id: id,
        Nome: this.ColunasGrid.find(s => s.Id === id).Name
      };
    });

    // seta no combo o primeiro layout do grid
    if (this.registerForm.controls.Layout.value === undefined) {
      this.Selecionado = this.Layouts[0].Id;
    } else {
      this.Selecionado = this.registerForm.controls.Layout.value;
    }

    // separa as colunas disponiveis para tela de layout
    // tslint:disable-next-line:max-line-length
    this.ColunasUti = this.ColunasGrid.filter(s => s.Id === this.Selecionado);
    // tslint:disable-next-line:max-line-length
    this.ColunasDisp = this.LayoutsAll.filter(obj => !this.ColunasUti.map(item => item.ColumnsTableTypes_Id).includes(obj.ColumnsTableTypes_Id));
  }

  MontarNomeCli(Cnpj: string, Nome: string): string {
    return FuncoesGenericas.FormatarStringCnpj(Cnpj) + ' - ' + Nome;
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      this.Notificacao.showNotification('warning', TraduzirErro('MsgDadosInvalidos', this.translate));
      return;
    }
    const DocumentosFiltro: DocumentosFiltrosEntity = new DocumentosFiltrosEntity();
    DocumentosFiltro.Branch = this.User.Branch;
    DocumentosFiltro.IdUser = this.User.UserLogged.Id;
    DocumentosFiltro.DocumentType = this.modelo;
    DocumentosFiltro.MODELO = this.modelo;
    DocumentosFiltro.TPNF = this.tipoDoc;
    DocumentosFiltro.CHAVE = this.registerForm.controls.Chave.value;
    DocumentosFiltro.NNF = this.registerForm.controls.NNF.value;
    DocumentosFiltro.Token = this.User.Token;

    if (this.registerForm.controls.Customer.value !== undefined) {
      if (this.tipoDoc === '0') {
        DocumentosFiltro.CNPJDstart = this.registerForm.controls.Customer.value.CNPJ;
        DocumentosFiltro.CNPJDend = this.registerForm.controls.Customer.value.CNPJ;
      } else {
        DocumentosFiltro.CNPJEstart = this.registerForm.controls.Customer.value.CNPJ;
        DocumentosFiltro.CNPJEend = this.registerForm.controls.Customer.value.CNPJ;
      }
    }

    if (this.registerForm.controls.DtEmiDe.value !== '') {
      if (this.registerForm.controls.DtEmiAte.value === '') {
        this.Notificacao.showNotification('warning', TraduzirErro('MsgErroDtEmiAte', this.translate));
        return;
      }
      DocumentosFiltro.DTEMIstart = this.registerForm.controls.DtEmiDe.value;
    }

    if (this.registerForm.controls.DtEmiAte.value !== '') {
      if (this.registerForm.controls.DtEmiDe.value === '') {
        this.Notificacao.showNotification('warning', TraduzirErro('MsgErroDtEmiDe', this.translate));
        return;
      }
      DocumentosFiltro.DTEMIend = this.registerForm.controls.DtEmiAte.value;
    }

    if (this.registerForm.controls.CnpjDest.value !== '') {
      DocumentosFiltro.CNPJDstart = this.registerForm.controls.CnpjDest.value;
      DocumentosFiltro.CNPJDend = this.registerForm.controls.CnpjDest.value;
    }

    if (this.registerForm.controls.CnpjEmi.value !== '') {
      DocumentosFiltro.CNPJEstart = this.registerForm.controls.CnpjEmi.value;
      DocumentosFiltro.CNPJEend = this.registerForm.controls.CnpjEmi.value;
    }

    this.PesquisarDados(DocumentosFiltro);
  }

  PesquisarDados(DocumentosFiltro: DocumentosFiltrosEntity) {
    // this.RequestCustomers();
    const datasource = {
      getRows: (params: IGetRowsParams) => {
        const GridParam: AgGridParamEntity = new AgGridParamEntity();
        GridParam.startRow = params.startRow;
        GridParam.endRow = params.endRow;
        GridParam.filterModel = JSON.stringify(params.filterModel);
        GridParam.sortModel = params.sortModel;
        GridParam.Token = this.User.Token;
        GridParam.filterData = DocumentosFiltro;

        this.documentosservice.GetDocsAg(GridParam).subscribe((data) => {
          const retorno = data as agGridReturnEntity;
          this.rowData = retorno.rows;
          params.successCallback(this.rowData, retorno.lastRow);
        },
          (err: HttpErrorResponse) => {
            VerificarTpErro(this.router, err.error.ExceptionMessage, this.Notificacao, this.translate);
          });
      }
    };
    this.paramsGrid.setDatasource(datasource);
  }


  AbridDoc(e) {
    const Dados: any = {
      Id: e.rowData.Id,
      NNF: e.rowData.NNF
    };
    this.SelDocsId.push(Dados);
    this.openSnackBar('NNF: ' + e.rowData.NNF + ' selecionada.');

    // tslint:disable-next-line:max-line-length
    this.router.navigate(['principal/doccomplementar'], { queryParams: { modelo: this.modelo, dados: JSON.stringify(this.SelDocsId), Tipo: this.tipoDoc }, skipLocationChange: true });
  }

  SetarId(e) {
    let Mensagem: string;
    const Dados: any = {
      Id: e.rowData.Id,
      NNF: e.rowData.NNF
    };
    if (e.checked) {
      this.SelDocsId.push(Dados);
      Mensagem = 'NNF: ' + e.rowData.NNF + ' selecionada.';
    } else {
      this.SelDocsId.splice(this.SelDocsId.indexOf(Dados), 1);
      Mensagem = 'NNF: ' + e.rowData.NNF + ' removida.';
    }
    this.openSnackBar(Mensagem);
  }

  CriarColunas(Dados: Array<GridLayoutRetEntity>) {
    const Colunas: Array<any> = new Array<any>();
    let Coluna: any;
    if (Dados.length > 0) {
      Colunas.push({
        filter: false,
        lockPinned: true,
        field: '',
        suppressToolPanel: true,
        suppressSizeToFit: true,
        width: 38,
        cellRenderer: 'checkboxeRender',
        cellRendererParams: {
          onClick: this.SetarId.bind(this),
          value: 'fa-folder-open',
          tooltip: 'Selecione para documentos complementares ou manifestações'
        }
      });

      Colunas.push(
        {
          width: 42,
          filter: false,
          lockPinned: true,
          suppressSizeToFit: true,
          suppressToolPanel: true,
          cellRenderer: 'imageRenderer',
          cellRendererParams: {
            onClick: this.AbridDoc.bind(this),
            icon: 'fa-link',
            tooltip: 'Documentos Complementares'
          }
        });

      // Verifica se o usuário logado tem acesso a funcionalidade anotações no documento
      if (this.VerificaAnotacao === true) {
        Colunas.push({
          filter: false,
          headerName: 'Anotações',
          field: 'Anotacao',
          editable: true,
          cellEditor: 'agLargeTextCellEditor',
          cellEditorParams: {
            maxLength: '300',
            cols: '50',
            rows: '6'
          },
          onCellValueChanged: this.SaveAnnotations.bind(this)
        });
      }
      Colunas.push({
        headerName: 'Id',
        field: 'Id',
        suppressToolPanel: true,
        width: 1,
        hide: true
      });

      Colunas.push({
        headerName: 'IDEME',
        field: 'IDEME',
        suppressToolPanel: true,
        width: 1,
        hide: true
      });

      Colunas.push({
        headerName: 'INDOC',
        field: 'INDOC',
        suppressToolPanel: true,
        width: 1,
        hide: true
      });

      Dados.forEach(value => {
        switch (value.DataType) {
          case 'decimal':
            switch (value.NmColumn) {
              case 'VNF':
                Coluna = {
                  headerName: value.DsColumn,
                  field: value.NmColumn,
                  filter: 'agTextColumnFilter',
                  cellRenderer: 'agAnimateShowChangeCellRenderer',
                  width: 138,
                  valueFormatter(data) {
                    if (data.value != null) {
                      return FuncoesGenericas.numberToReal(data.value, 2);
                    } else {
                      return '';
                    }
                  },
                  filterParams: {
                    filterOptions: ['equals', 'notEqual', 'lessThan', 'lessThanOrEqua', 'greaterThan', 'greaterThanOrEqual'],
                    textFormatter(filter) {
                      console.log('Coluna VNF: ' + filter);
                      if (filter == null) { return null; }

                      if (filter.toString().indexOf(',') > 0 && filter.toString().indexOf('.') <= 0) {
                        filter = filter.toString().replace(',', '.');
                      }
                      return FuncoesGenericas.numberToReal(filter.toString(), 2);
                    }
                  }
                };
                Colunas.push(Coluna);
                break;
              case 'QCOM':
              case 'NNF':
                Coluna = {
                  headerName: value.DsColumn,
                  field: value.NmColumn,
                  filter: 'agNumberColumnFilter',
                  cellRenderer: 'agAnimateShowChangeCellRenderer',
                  width: 138,
                  filterParams: {
                    filterOptions: ['equals', 'notEqual', 'lessThan', 'lessThanOrEqual', 'greaterThan', 'greaterThanOrEqual']
                  }
                };
                Colunas.push(Coluna);
                break;
              default:
                Coluna = {
                  headerName: value.DsColumn,
                  field: value.NmColumn,
                  filter: 'agTextColumnFilter',
                  cellRenderer: 'agAnimateShowChangeCellRenderer',
                  width: 138,
                  valueFormatter(data) {
                    if (data.value != null) {
                      return FuncoesGenericas.numberToReal(data.value, 4);
                    } else {
                      return '';
                    }
                  },
                  filterParams: {
                    filterOptions: ['equals', 'notEqual', 'lessThan', 'lessThanOrEqual', 'greaterThan', 'greaterThanOrEqual'],
                    textFormatter(filter) {
                      console.log('Coluna NNF: ' + filter);
                      if (filter == null) { return null; }

                      if (filter.toString().indexOf(',') > 0 && filter.toString().indexOf('.') <= 0) {
                        filter = filter.toString().replace(',', '.');
                      }
                      return FuncoesGenericas.numberToReal(filter.toString(), 2);
                    }
                  }
                };
                Colunas.push(Coluna);
                break;
            }
            break;
          case 'datetime':
            Coluna = {
              headerName: value.DsColumn,
              field: value.NmColumn,
              suppressMenu: true,
              width: 138,
              filter: 'agDateColumnFilter',
              cellRenderer: 'agAnimateShowChangeCellRenderer',
              enableRowGroup: true,
              valueFormatter(data) {
                if (data.value != null) {
                  return moment(data.value).format('L');
                } else {
                  return '';
                }
              }
              ,
              filterParams: {
                filterOptions: ['equals', 'notEqual', 'lessThan', 'greaterThan'],
                comparator(filterLocalDateAtMidnight, cellValue) {
                  const dateAsString = moment(cellValue).format('L');
                  const dateParts = dateAsString.split('/');
                  const cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));

                  if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                    return 0;
                  }

                  if (cellDate < filterLocalDateAtMidnight) {
                    return -1;
                  }

                  if (cellDate > filterLocalDateAtMidnight) {
                    return 1;
                  }
                }
              },
              /*                 floatingFilterComponentParams: {
                              suppressFilterButton: true
                            }  */

            };
            Colunas.push(Coluna);
            break;
          case 'bigint':
            Coluna = {
              headerName: value.DsColumn,
              field: value.NmColumn,
              width: 138,
              enableRowGroup: true,
              suppressMenu: true,
              filter: 'agTextColumnFilter',
              cellRenderer: 'agAnimateShowChangeCellRenderer',
              /*               valueFormatter(data) {
                               if (data.value !== null || data.value !== undefined) {
                                return FuncoesGenericas.FormatarStringCnpj(data.value);
                              }
                            }, */
              filterParams: {
                filterOptions: ['equals', 'notEqual', 'lessThan', 'lessThanOrEqual', 'greaterThan', 'greaterThanOrEqual'],
                textFormatter(r) {
                  console.log('Coluna CNPJ: ' + r);
                  if (r == null) { return null; }
                  r = FuncoesGenericas.FormatarStringCnpj(r.toString());
                  return r;
                }
              }
            };
            Colunas.push(Coluna);
            break;
          default:
            Coluna = {
              headerName: value.DsColumn,
              field: value.NmColumn,
              width: 138,
              enableRowGroup: true,
              suppressMenu: true,
              filter: 'agTextColumnFilter',
              cellRenderer: 'agAnimateShowChangeCellRenderer',
              filterParams: {
                filterOptions: ['equals', 'notEqual', 'lessThan', 'lessThanOrEqual', 'greaterThan', 'greaterThanOrEqual']
              }
            };
            Colunas.push(Coluna);
        }
      });

    }
    return Colunas;
  }
}
