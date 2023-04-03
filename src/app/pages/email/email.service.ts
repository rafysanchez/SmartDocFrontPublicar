/**
 * @description Serviço de email
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Injectable } from '@angular/core';
import { CustomerEntity } from '../entity/customer.entity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmailEntity } from '../entity';
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  myheader: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  public RequestCnpjs(CNPJ: CustomerEntity): Observable<any> {
    const Url = '/back/api/email/RetCustDisp/';


    return this.http.post(Url, CNPJ, { headers: this.myheader });

  }

  public Save(Email: EmailEntity) {
    const Url = '/back/api/email/saveEmail';
    return this.http.post(Url, Email, { headers: this.myheader });

  }

  public GetById(token: string, id: number, branch: string): Observable<any> {
    const obj = {
      Token: token,
      Id: id,
      Branch: branch
    };
    const Url = '/back/api/email/RetEmailById';
    return this.http.post(Url, JSON.stringify(obj), { headers: this.myheader });

  }
}
