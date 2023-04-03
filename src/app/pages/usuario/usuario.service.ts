import { Injectable } from '@angular/core';
import { GrupoEntity, UserEntity } from '../entity';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestUser } from '../entity/RequestUser';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  myheader: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  public RetGrupos(Token: string, Grupo: GrupoEntity): Observable<any> {
    const Url: string = '/back/api/group/' + Token + '/RetActiveGrupos';
    return this.http.post(Url, Grupo, { headers: this.myheader });
  }

  public RetFuncionalidades(Token: string) {
    const Url: string = '/back/api/Menu/' + Token;
    return this.http.get(Url);
  }

  public RetAcessos(Token: string): Observable<any> {
    const Url: string = '/back/api/Funcionalidades/' + Token;
    return this.http.get(Url);
  }

  public RetManifestacoes(Token: string): Observable<any> {
    const Url: string = '/back/api/user/' + Token + '/GetManifestacoes';
    return this.http.post(Url, null);
  }

  public Save(Token: string, User: UserEntity) {
    const Url: string = '/back/api/user/' + Token;
    return this.http.post(Url, User, { headers: this.myheader });
  }

  public GetUsuarioById(dadosAlt: RequestUser): Observable<any> {
    const Url = '/back/api/user/RetUser';
    return this.http.post(Url, dadosAlt, { headers: this.myheader });
  }
}
