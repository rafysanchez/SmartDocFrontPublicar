/**
 * @description Serviço das exportacao
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ExportacaoEntity } from '../entity';
import { FuncoesGenericas } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class ExportacaoService {
  myheader: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  public Save(Token: string, Dados: ExportacaoEntity) {
    const Url: string = '/back/api/Export/' + Token;
    return this.http.post(Url, Dados, { headers: this.myheader });

  }

  public RetExport(Dados: ExportacaoEntity) {
    const Url = '/back/api/Export/Filter';
   // const params = FuncoesGenericas.toHttpParams(Dados);
    return this.http.post(Url, Dados, { headers: this.myheader });

  }
}
