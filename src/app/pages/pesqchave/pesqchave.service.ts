/**
 * @description Serviço de pesquisa por chave
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PesqchaveService {

  myheader: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http: HttpClient) { }

  public RetDoc(Token: string, Chave: string): Observable<any> {
    let Url: string = "/back/api/SearchKey/" + Token + "/RetArquivos/" + Chave;
    return this.http.post(Url,null, { headers: this.myheader });

  }
}
