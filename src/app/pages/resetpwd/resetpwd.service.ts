/**
 * @description Serviço para reset de senha
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Injectable } from '@angular/core';
import { LoginSapViewEntity } from '../entity/loginsapview.entity';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResetpwdService {

  constructor(private http: HttpClient) { }

  public ResetPwd(Login: LoginSapViewEntity) {
    return this.http.post('/back/api/login/reset', Login);

  }
}
