import { UserLoggedEntity } from './../entity/userlogged.entity';
/**
 * @description Serviço de documentos
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { DocumentosFiltrosEntity, GridLayoutFilterEntity, CustomerEntity, GridLayoutEntity,
        SapRequestEntity, agGridParamEntity, DocumentosAnnotationsEntity } from '../entity';
import { Observable } from 'rxjs';
import { FuncoesGenericas } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  myheader: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  public GetDocs(Dados: DocumentosFiltrosEntity): Observable<any> {
    const Url = '/back/api/documents/RetDocs';
    return this.http.post(Url, Dados, { headers: this.myheader });
  }
  public GetDocsAg(Dados: agGridParamEntity): Observable<any> {
    const Url = '/back/api/documents/RetDocs';
    return this.http.post(Url, Dados, { headers: this.myheader });
  }
  public GetLayoutsGrid(Token: string, Dados: GridLayoutFilterEntity): Observable<any> {
    const Url: string = '/back/api/gridLayouts/' + Token + '/filter';
    const params = FuncoesGenericas.toHttpParams(Dados);
    return this.http.get(Url, { params });
  }

  public GetCnpj(Token: string, Dados: CustomerEntity): Observable<any> {
    const Url: string = '/back/api/customer/' + Token + '/RetCnpjsCombo';
    return this.http.post(Url, Dados, { headers: this.myheader });
  }

  public GetEstados(Token: string): Observable<any> {
    const Url: string = '/back/api/cidades/' + Token + '/GetEstados';
    return this.http.get(Url);
  }

  public SalvarLayout(Token: string, Dados: GridLayoutEntity): Observable<any> {
    const Url: string = '/back/api/GridLayout/' + Token;
    return this.http.post(Url, Dados, { headers: this.myheader });
  }

  public SendMani(Token: string, Dados: SapRequestEntity): Observable<any> {
    const Url: string = '/back/api/documents/' + Token + '/Manifest';
    return this.http.post(Url, Dados, { headers: this.myheader });
  }

  public DelLayout(Token: string, Id: string): Observable<any> {
    const Url: string = '/back/api/GridLayout/' + Token + '/Excluir/' + Id;
    return this.http.get(Url);
  }

/*   public VerificaAnotacao(Token: string, Id: string): Observable<any> {
    const Url: string = '/back/api/ChecaAnotacao/' + Token + '/' + Id;
    return this.http.get(Url);
  } */

  public VerificaAnotacao(Token: string, Id: string): Observable<any> {
    const Url: string = '/back/api/documents/' + Token + '/ChecaAnotacao/' + Id;
    return this.http.get(Url);
  }

  public SaveAnnotations(Token: string, DocumentosAnnotations: DocumentosAnnotationsEntity) {
    const Url: string = '/back/api/documents/' + Token + '/SaveAnnotations';
    return this.http.post(Url, DocumentosAnnotations);

  }

}
