/**
 * @description Serviço do cadastro de cnpj
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GrupoEntity, CustomerEntity } from '../entity';

@Injectable({
  providedIn: 'root'
})
export class CnpjService {
  myheader: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  public RetGrupos(Grupo: GrupoEntity) {
    const Url = '/back/api/group/RetActiveGrupos';
    return this.http.post(Url, Grupo, { headers: this.myheader });
  }

  public Save(Customer: CustomerEntity) {
    const Url = '/back/api/customer/saveCustomer';
    return this.http.post(Url, Customer, { headers: this.myheader });

  }

  public GetById(Customer: CustomerEntity) {
    const Url = '/back/api/customer/GetCustomerById';
    return this.http.post(Url, Customer, { headers: this.myheader } );

  }
}
