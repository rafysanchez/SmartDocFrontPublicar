/**
 * @description Serviço dos usuários
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserEntity, AgGridParamEntity } from '../entity';
import { UserRequest } from '../entity/userRequest';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  myheader: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  public RequestCustomers(User: AgGridParamEntity) {
    const Url = '/back/api/user/RetUsers';

    return this.http.post(Url, User, { headers: this.myheader });

  }

  public Excluir(dados: UserRequest) {
    const Url: string = '/back/api/user/DeleteUser';
    return this.http.post (Url, dados, { headers: this.myheader });

  }
}
