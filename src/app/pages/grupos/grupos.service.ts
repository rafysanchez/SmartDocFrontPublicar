/**
 * @description Serviço de grupos
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GrupoEntity, AgGridParamEntity } from '../entity';

@Injectable({
  providedIn: 'root'
})
export class GruposService {
  myheader: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http: HttpClient) { }

  public RequestGroup(Grupo: AgGridParamEntity) {
    const Url = '/back/api/group/RetGrupos';

    return this.http.post(Url, Grupo, { headers: this.myheader });
  }

  public Excluir(grupo: GrupoEntity) {
    const Url = '/back/api/group/DeleteGroup';
    const obj = {
      Token: grupo.Token,
      Id: grupo.Id,
      Branch: grupo.Branch
      };
    return this.http.post(Url, JSON.stringify(obj), { headers: this.myheader } );

  }
}
