/**
 * @description Serviço do dashboard admin
 * @author Delio Darwin
 * @since 1.0.0
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DashboardAdmService {

  constructor(private http: HttpClient) { }

  public RequestReport(Token:string, ReportId: string) {
    let Url:string = "/back/api/powerbi/?Token=" + Token + "&ReportId=" + ReportId;
    return this.http.get(Url);

  }
}
