/**
 * @description Serviço dos cnpjs
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CustomerEntity, AgGridParamEntity } from '../entity';

@Injectable({
  providedIn: 'root'
})
export class CnpjsService {
  myheader: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  public RequestCnpjs(CNPJ: AgGridParamEntity) {
    const Url = '/back/api/customer/RetCnpjs';

    return this.http.post(Url, CNPJ, { headers: this.myheader });

  }

  public Excluir(token: string, id: number, branch: string) {
    const Url = '/back/api/customer/DelCnpjs';

    const obj = {
      Token: token,
      Id: id,
      Branch: branch
  };

    return this.http.post(Url, JSON.stringify(obj), { headers: this.myheader });

  }
}
