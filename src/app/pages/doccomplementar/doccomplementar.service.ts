/**
 * @description Serviço dos documentos complementares
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GridLayoutFilterEntity } from '../entity';
import { FuncoesGenericas } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class DoccomplementarService {

  myheader: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  public GetDocs(BranchData: string, TokenData: string, Id: number): Observable<any> {

    const obj = {
      Token: TokenData,
      Branch: BranchData
    };
    const Url: string = '/back/api/documents/RetDoc/' + Id;
    return this.http.post(Url,  JSON.stringify(obj), { headers: this.myheader });
  }


  public GetLayoutsGrid(Token: string, Dados: GridLayoutFilterEntity): Observable<any> {
    const Url: string = '/back/api/gridLayouts/' + Token + '/filter';
    const params = FuncoesGenericas.toHttpParams(Dados);
    return this.http.get(Url, { params });
  }

// public DownloadFiles(Token: string, Id: number): Observable<any> {
  //   console.log('chegou no serviço:', Id);
  //   console.log('token:', Token);
  //   const Url: string = 'http://localhost:62663/api/documents/' + Token + '/DownloadFile/'  + Id;
  //   console.log('Url: ', Url);
  //   const params = null;
  //   return this.http.get(Url, { params });
  // }

  public DownloadFiles(Token: string, Id: number): Observable<Blob> {
    return this.http.get('/back/api/documents/' + Token + '/DownloadFile/'  + Id, {
      responseType: 'blob'
    });
  }


}
