/**
 * @description Serviço da alteração de senha
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginSapViewEntity } from '../entity/loginsapview.entity';

@Injectable({
  providedIn: 'root'
})
export class ModpwdService {

  constructor(private http: HttpClient) { }

  public ResetPwd(Login: LoginSapViewEntity){
    return this.http.post('/back/api/login', Login);

  }
}
