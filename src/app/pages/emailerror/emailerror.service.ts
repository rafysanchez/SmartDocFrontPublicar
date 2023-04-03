/**
 * @description Serviço de log
 * @author Delio Darwin
 * @since 1.0.0
 */
import { Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DocumentosEmailFiltrosEntity} from '../entity';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmailErrorService {

  myheader: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

/*   private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let countries = sort(this.datas, sortColumn, sortDirection);

    // 2. filter
    countries = countries.filter(country => matches(country, searchTerm, this.pipe));
    const total = countries.length;

    // 3. paginate
    countries = countries.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({countries, total});
  } */

   public RequestDocumentEmail(Dados: DocumentosEmailFiltrosEntity): Observable<any> {
     const Url = '/back/api/emailserror/RetDocs';
     return this.http.post(Url, Dados, { headers: this.myheader });
   }

}
