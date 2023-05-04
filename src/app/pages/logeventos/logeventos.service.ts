/**
 * @description Serviço de log
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LogEntity, AgGridParamEntity } from '../entity';

@Injectable({
  providedIn: 'root'
})
export class LogeventosService {

  myheader: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  public RequestLog(Token: string, Dados: AgGridParamEntity) {
    const Url: string = '/back/api/log/' + Token;

    return this.http.post(Url, Dados, { headers: this.myheader });

  }
}
