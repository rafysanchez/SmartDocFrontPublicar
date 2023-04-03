/**
 * @description Serviço de grupos
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GrupoEntity, agGridParamEntity } from '../entity';

@Injectable({
  providedIn: 'root'
})
export class GruposService {
  myheader: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http: HttpClient) { }

  public RequestGroup(Grupo: agGridParamEntity) {
    const Url = '/back/api/group/RetGrupos';

    return this.http.post(Url, Grupo, { headers: this.myheader });
  }

  public Excluir(Token: string, Id: number) {
    const Url = '/back/api/group/' + Token + '/' + Id;
    return this.http.delete(Url);

  }
}
