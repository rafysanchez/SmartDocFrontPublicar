import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { finalize, catchError } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerComponent } from '../spinner/spinner.component';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    private loading: SpinnerComponent;
    constructor(private spinner: NgxSpinnerService ) {
        this.loading = new SpinnerComponent(this.spinner);
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loading.Mostrar();
       

        return next.handle(req.clone()).pipe(
            finalize(() =>
                 this.loading.Fechar()
            )//,
            // catchError((err: HttpErrorResponse) => {
            //     if (err.status === 401) {
            //         // this.usuarioService.logoutWithRedirect();
            //     }
            //     return throwError(err);
            // })
        );

    }
}
