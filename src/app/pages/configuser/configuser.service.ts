import { Injectable } from '@angular/core';
import { UserEntity } from '../entity';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfiguserService {

  constructor(private http: HttpClient) { }

  public RetDados(Token: string, Id: number) {
    let Parametros: string = "?token=" + Token + "&id=" + Id;
    return this.http.get("/back/api/user" + Parametros);

  }

  public SaveConfig(Token: string, User: UserEntity) {
    let Url: string = "/back/api/user/" + Token + "/SaveConfig";
    return this.http.post(Url, User);

  }
}
