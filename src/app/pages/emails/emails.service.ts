import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EmailEntity, AgGridParamEntity } from '../entity';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {
  myheader: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  public RequestEmails(Email: AgGridParamEntity) {
    const Url = '/back/api/email/RetEmails';

    return this.http.post(Url, Email, { headers: this.myheader });

  }

  public Excluir(token: string, id: number, branch: string) {
    const obj = {
      Id: id,
      Branch: branch,
      Token: token
    };

    const Url = '/back/api/email/excluirEmail' ;

    return this.http.post(Url, JSON.stringify(obj), { headers: this.myheader });

  }
}
