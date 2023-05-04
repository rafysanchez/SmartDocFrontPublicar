/**
 * @description Serviço de log
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DocumentosEmailFiltrosEntity, AgGridParamEntity} from '../entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntmailService {

  myheader: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }
/*
   public RequestDocumentEmail(Token: string, Dados: DocumentosEmailFiltrosEntity): Observable<any> {
     const Url: string = '/back/api/emailserror/' + Token + '/RetDocs';
     return this.http.post(Url, Dados, { headers: this.myheader });
   } */

   public RequestDocumentEmail(Dados: AgGridParamEntity) {
    const Url = '/back/api/emailserror/RetDocs';

    return this.http.post(Url, Dados, { headers: this.myheader });
  }

}
