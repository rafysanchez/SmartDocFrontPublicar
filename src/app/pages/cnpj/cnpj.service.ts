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

  public RetGrupos(Token: string, Grupo: GrupoEntity){
    let Url: string = "/back/api/group/" + Token + "/RetActiveGrupos";
    return this.http.post(Url, Grupo, { headers: this.myheader });
  }

  public Save(Token:string,Customer:CustomerEntity)
  {
    let Url: string = "/back/api/customer/" + Token;
    return this.http.post(Url, Customer, { headers: this.myheader });

  }

  public GetById(Token:string,Id: number)
  {
    let Url: string = "/back/api/customer/" + Token + "/" + Id;
    return this.http.get(Url);

  }
}
