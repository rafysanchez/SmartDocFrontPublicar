/**
 * @description Serviço do dashboard
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PowerBiRequest } from '../entity/PowerBiRequest';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  myheader: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  public RequestReport(dados: PowerBiRequest) {

   const Url = '/back/api/powerbi/ShowReport';

   // let Url:string = "http://localhost:62663/api/powerbi/?Token=" + Token + "&ReportId=" + ReportId;

   return this.http.post(Url, dados, { headers: this.myheader });

  }
}
