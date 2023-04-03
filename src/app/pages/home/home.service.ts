
/**
 * @description Serviços da Home Page
 * @author Delio Darwin
 * @since 1.0.0
 */
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HomeEntity } from './../entity/home.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  myheader: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

   public GetIndicadores(Dados: HomeEntity): Observable<any> {
     const Url = '/back/api/home/GetIndicadores';
     // const Url: string = 'http://localhost:62663/api/home/' + Token + '/GetIndicadores';

     return this.http.post(Url, Dados, { headers: this.myheader });
   }

}

