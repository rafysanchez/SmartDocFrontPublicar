/**
 * @description Serviço de pertinnente ao login
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogEntity, LoginEntity } from '../entity';
import { LanguageTranslationModule } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  public RequestLogin(Login:LoginEntity){

    const url = '/back/api/login';

   //const url = 'http://localhost:62663/api/login';

   return this.http.post(url,Login);

  }
}
