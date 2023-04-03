/**
 * @description Serviço do dashboard
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  public RequestReport(Token: string, ReportId: string) {

   const Url: string = '/back/api/powerbi/?Token=' + Token + '&ReportId=' + ReportId;

   // let Url:string = "http://localhost:62663/api/powerbi/?Token=" + Token + "&ReportId=" + ReportId;

   return this.http.get(Url);

  }
}
