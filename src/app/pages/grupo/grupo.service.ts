
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GrupoEntity } from '../entity';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  myheader: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  public Save(Grupo: GrupoEntity) {
    const Url = '/back/api/group/SaveGroup' ;
    return this.http.post(Url, JSON.stringify(Grupo), { headers: this.myheader });

  }

  public GetById(Grupo: GrupoEntity) {
    const Url = '/back/api/group/RetGroupById';
    return this.http.post(Url, Grupo, { headers: this.myheader });

  }

}
