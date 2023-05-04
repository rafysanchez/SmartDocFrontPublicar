/**
 * @description Serviço das exportações
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ExportacaoEntity, AgGridParamEntity } from '../entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExportacoesService {
  myheader: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  public RequestExportacoes(Dados: AgGridParamEntity) {
    const Url = '/back/api/Export/RetExport';

    return this.http.post(Url, Dados, { headers: this.myheader });
  }

  // tslint:disable-next-line: align
  public Excluir(Token: string, Dados: ExportacaoEntity): Observable<any> {
    const Url = '/back/api/Export/' + Token + '/' + Dados.Id;
    return this.http.delete(Url);

  }

}
