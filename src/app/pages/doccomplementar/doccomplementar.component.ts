/**
 * @description Componente dos documentos complementares
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Component, OnInit, ViewChild, ElementRef, SecurityContext } from '@angular/core';
import { slideToTop } from 'src/app/router.animations';
import { DoccomplementarService } from './doccomplementar.service';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageTranslationModule, NotificacaoComponent, SpinnerComponent, VerificarTpErro, FuncoesGenericas } from '../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginSapResponse, DocumentosEntity, GridLayoutFilterEntity, GridLayoutRetEntity } from '../entity';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RetArquivoEntity, TipoArquivo } from '../entity/retarquivo.entity';
import * as moment from 'moment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IGetRowsParams } from 'ag-grid-community';
import { HttpErrorResponse } from '@angular/common/http';
import { NullTemplateVisitor } from '@angular/compiler';
declare function prettyPrint(): any;

@Component({
  selector: 'app-doccomplementar',
  templateUrl: './doccomplementar.component.html',
  styleUrls: ['./doccomplementar.component.scss'],
  animations: [slideToTop()]
})

export class DoccomplementarComponent implements OnInit {
  modelo: any;
  modeloPage: string;
  Notas: any;
  Nota: number;
  colunasItens: any;
  linhasItens: any;
  colunasComplemento: any;
  linhasComplemento: any;
  DadosHeader: DocumentosEntity;
  DocAnexos: Array<RetArquivoEntity>;
  LayoutHeader: Array<GridLayoutFilterEntity>;
  LayoutItems: Array<GridLayoutFilterEntity>;
  private Notificacao: NotificacaoComponent;
  private loading: SpinnerComponent;
  columnDefs;
  rowData: any;
  User: LoginSapResponse;
  tipoDoc: any;
  registerForm: FormGroup;
  Documento: RetArquivoEntity = new RetArquivoEntity();
  Idioma: string;
  hidePdfViewer = false;
  hideImgViewer = false;
  hideXmlViewer = false;
  hideEmailViewer = false;
  hideLinkViewer = false;
  hideEmailHtmlViewer = false;
  hideEmailXmlViewer = false;
  hideItensViewer = false;
  hideFeaturesViewer = false;
  TipoDocumento: string;
  XmlString: string;
  Base64: string;
  Selecionado: any;
  Link: SafeResourceUrl;
  single = 'single';
  style = {
    width: '100%',
    height: '210px'
  };
  paramsGrid: any;
  params: any;
  paramsGridItem: any;
  paramsItem: any;
  paramsGridCompl: any;
  paramsCompl: any;
  NotaId: number;
 
  get f() { return this.registerForm.controls; }

  constructor(private doccomplementarservice: DoccomplementarService, private Notifi: NotifierService,
              private spinner: NgxSpinnerService, private translate: LanguageTranslationModule,
              private Activatedroute: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder, public sanitizer: DomSanitizer) {

    this.Notificacao = new NotificacaoComponent(Notifi);
    this.loading = new SpinnerComponent(spinner);
    this.modelo = this.Activatedroute.snapshot.queryParamMap.get('modelo') || 0;
    this.tipoDoc = this.Activatedroute.snapshot.queryParamMap.get('Tipo') || 0;
    this.Notas = JSON.parse(this.Activatedroute.snapshot.queryParamMap.get('dados'));
    this.User = JSON.parse(localStorage.getItem('User'));
    this.modeloPage = ' - ' + this.modelo;
  }


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Documentos: ['']
    });

    switch (localStorage.getItem('Linguagem')) {
      case 'pt br':
        this.Idioma = 'pt-BR';
        break;
      case 'en':
        this.Idioma = 'en-US';
        break;

    }
    this.Nota = this.Notas[0].NNF;
    this.ChamarLayouts();
    this.ChamarDados(this.Notas[0].Id);

  }


  ExibirDoc() {
    this.LimparVar();
    let Documento: RetArquivoEntity;

    if (this.registerForm.controls.Documentos.value !== undefined) {
      Documento = this.registerForm.controls.Documentos.value;
    } else {
      Documento = this.Selecionado;
    }

    // tslint:disable-next-line:max-line-length
    if (Documento.SrcBase64.indexOf('nfe.prefeitura.sp.gov.br') !== -1 || Documento.SrcBase64.indexOf('isscuritiba.curitiba.pr.gov.br') !== -1) {
      Documento.Tipo = TipoArquivo.JPG;
    }

    switch (Documento.Tipo) {
      case TipoArquivo.PDF:
        this.Documento = Documento;
        this.hidePdfViewer = true;
        break;
      case TipoArquivo.XML:
        this.hideXmlViewer = true;
        this.XmlString = atob(Documento.SrcBase64);
        setTimeout(() => {
          // função no js para pintar o xml
          prettyPrint();
        }, 200);
        break;
      case TipoArquivo.EMAIL:
        this.hideEmailViewer = true;
        if (Documento.SrcBase64.indexOf('<html') >= 0) {
          this.hideEmailHtmlViewer = true;
          this.Link = this.sanitizer.bypassSecurityTrustHtml(Documento.SrcBase64);
        }

        if (Documento.SrcBase64.indexOf('<?xml') >= 0) {
          this.hideEmailXmlViewer = true;
          this.XmlString = Documento.SrcBase64;
          setTimeout(() => {
            // função no js para pintar o xml
            prettyPrint();
          }, 200);
        }
        this.Documento = Documento;
        break;
      case TipoArquivo.LINK:
        this.hideLinkViewer = true;
        this.Link = this.sanitizer.bypassSecurityTrustResourceUrl(Documento.SrcBase64);
        this.Documento = Documento;
        break;
      case TipoArquivo.PNG:
      case TipoArquivo.JPG:
        this.hideImgViewer = true;
        if (Documento.SrcBase64.indexOf('://') < 0) {
          this.Link = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + Documento.SrcBase64);
        } else {
          this.Link = this.sanitizer.bypassSecurityTrustResourceUrl(Documento.SrcBase64);
        }

        this.Documento = Documento;
        break;
    }
  }

  PesqNnf(Id: any) {
    const Qtd: number = this.Notas.length;
    const Index: any = this.Notas.findIndex(element => {
      return element.NNF === this.Nota;
    });

    let DadosNNF: any;
    switch (Id) {
      case 1:
        if (Index + 1 >= Qtd) {
          DadosNNF = this.Notas[this.Notas.length - 1];
        } else {
          DadosNNF = this.Notas[Index + 1];
        }
        break;
      case -1:
        if (Index - 1 <= 0) {
          DadosNNF = this.Notas[0];
        } else {
          DadosNNF = this.Notas[Index - 1];
        }
        break;
    }

    if (DadosNNF.NNF === this.Nota) { return; }

    this.Nota = DadosNNF.NNF;
    this.LimparVar();
    this.loading.Mostrar();
    this.ChamarDados(DadosNNF.Id);
    this.loading.Fechar();
  }

  CriarColunasFeatures() {
    const Colunas: Array<any> = new Array<any>();

    Colunas.push({
      headerName: 'Característica',
      field: 'FEATURE',
      width: 138,
      enableRowGroup: true,
      suppressMenu: true,
      filter: 'agTextColumnFilter',
      cellRenderer: 'agAnimateShowChangeCellRenderer'
    });

    Colunas.push({
      headerName: 'Valor',
      field: 'VALUE',
      width: 320,
      enableRowGroup: true,
      suppressMenu: true,
      filter: 'agTextColumnFilter',
      cellRenderer: 'agAnimateShowChangeCellRenderer'
    });

    this.colunasComplemento = Colunas;
  }

  ChamarLayouts() {
    const LayoutsFiltro: GridLayoutFilterEntity = new GridLayoutFilterEntity();
    LayoutsFiltro.Modelo = this.modelo;
    LayoutsFiltro.Table = 'DocumentHeaders';

    // tslint:disable-next-line: max-line-length
    const LayoutsHeader = this.doccomplementarservice.GetLayoutsGrid(this.User.Token, LayoutsFiltro).pipe(catchError(error => of(VerificarTpErro(this.router, error.error.ExceptionMessage, this.Notificacao, this.translate))));

    LayoutsFiltro.Table = 'DocumentItems';
    // tslint:disable-next-line: max-line-length
    const LayoutsItens = this.doccomplementarservice.GetLayoutsGrid(this.User.Token, LayoutsFiltro).pipe(catchError(error => of(VerificarTpErro(this.router, error.error.ExceptionMessage, this.Notificacao, this.translate))));

    forkJoin([LayoutsHeader, LayoutsItens]).subscribe(results => {
      this.LayoutHeader = results[0];
      this.LayoutItems = results[1];
      this.columnDefs = this.CriarColunas(this.LayoutHeader);
      this.colunasItens = this.CriarColunas(this.LayoutItems);
      this.CriarColunasFeatures();
    });

  }

  LimparVar() {
    this.hidePdfViewer = false;
    this.hideImgViewer = false;
    this.hideXmlViewer = false;
    this.hideEmailViewer = false;
    this.hideLinkViewer = false;
    this.hideEmailHtmlViewer = false;
    this.hideEmailXmlViewer = false;
  }
  ChamarDados(Id: number) {
    this.LimparVar();
    this.DocAnexos = null;
    this.DadosHeader = null;
    this.rowData = null;
    this.linhasItens = null;
    this.linhasComplemento = null;
    this.loading.Mostrar();

    this.doccomplementarservice.GetDocs(this.User.Branch, this.User.Token, Id).subscribe((data) => {
      this.DadosHeader = data.DocumentHeader;
      this.DocAnexos = data.Arquivos;
      this.rowData = new Array<DocumentosEntity>();
      this.rowData.push(this.DadosHeader);
      this.linhasItens = this.DadosHeader.DocumentItems;
      this.linhasComplemento = this.DadosHeader.DocumentFeatures;

      if (this.linhasItens.length > 0) {
        this.hideItensViewer = true;
      }

      if (this.linhasComplemento.length > 0) {
        this.hideFeaturesViewer = true;
      }

      let Doc: RetArquivoEntity;
      // verifica se existe dacte ou danfe
      if (this.modelo === 'NF-e') {
        Doc = this.DocAnexos.filter(element => {
          if (element.NmFile != null) {
            if ((element.NmFile.indexOf('DANFE_') >= 0) || (element.NmFile.indexOf('DACTE_')) >= 0) {
              return element;
            }
          }
        })[0];
      } else {
        Doc = this.DocAnexos.filter(element => {
          if (element.NmFile != null) {
            if ((element.Tipo === TipoArquivo.JPG) || (element.Tipo === TipoArquivo.PDF)) {
              return element;
            }
          }
        })[0];

        if (Doc === undefined) {
         Doc = this.DocAnexos.filter(element => {
           if (element.NmFile != null) {
             if ((element.Tipo === TipoArquivo.LINK) || (element.Tipo === TipoArquivo.EMAIL)) {
               return element;
             }
           }
         })[0];
        }
      }

      if (Doc !== undefined) {
        this.Selecionado = Doc;
        this.ExibirDoc();
      }
    },
      (err: HttpErrorResponse) => {
        VerificarTpErro(this.router, err.error.ExceptionMessage, this.Notificacao, this.translate);
      });
    this.loading.Fechar();
  }


  Voltar(): void {
    this.router.navigate(['principal/documentos'], { queryParams: { modelo: this.modelo, Tipo: this.tipoDoc }, skipLocationChange: true });
  }

  CriarColunas(Dados: Array<GridLayoutRetEntity>): Array<any> {
    const Colunas: Array<any> = new Array<any>();
    let Coluna: any;
    if (Dados.length > 0) {
      // tslint:disable-next-line: only-arrow-functions
      Dados.forEach(function(value) {
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
                    textFormatter(filter) {
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
                  filter: 'agTextColumnFilter',
                  cellRenderer: 'agAnimateShowChangeCellRenderer',
                  width: 138
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
/*                   valueFormatter(data) {
                    if (data.value != null) {
                      return FuncoesGenericas.numberToReal(data.value, 4);
                    } else {
                      return '';
                    }
                  }, */
                  filterParams: {
                    textFormatter(filter) {
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
              },
              filterParams: {
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
              }, floatingFilterComponentParams: {
                suppressFilterButton: true
              }

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
                if (data.value != null) {
                  return FuncoesGenericas.FormatarStringCnpj(data.value);
                } else {
                  return '';
                }
              }, */
              filterParams: {
                textFormatter(r) {
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
              cellRenderer: 'agAnimateShowChangeCellRenderer'
            };
            Colunas.push(Coluna);
        }
      });

    }
    return Colunas;
  }

  // DownloadArquivos(): any {
  //   console.log('download de nota', this.Notas[0].Id);
  //   const ret = this.doccomplementarservice.DownloadFiles(this.User.Token, this.Notas[0].Id).subscribe((data) => {

  //     console.log('data de retorno: ', data);
  //   });

  // }

  DownloadArquivos(): void {
    this.doccomplementarservice.DownloadFiles(this.User.Token, this.Notas[0].Id)
      .subscribe(blob => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = this.Notas[0].Id  + '.zip';
        a.click();
        URL.revokeObjectURL(objectUrl);
      });
  }

}
