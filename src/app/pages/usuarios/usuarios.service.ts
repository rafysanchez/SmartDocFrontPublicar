/**
 * @description Serviço dos usuários
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserEntity, agGridParamEntity } from '../entity';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  myheader: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  public RequestCustomers(User: agGridParamEntity) {
    const Url = '/back/api/user/RetUsers';

    return this.http.post(Url, User, { headers: this.myheader });

  }

  public Excluir(Token: string, Id: number) {
    const Url: string = '/back/api/user/' + Token + '/' + Id;
    return this.http.delete(Url);

  }
}
