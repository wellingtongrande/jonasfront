import { Injectable, NgModule } from '@angular/core';
import { HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpResponse, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        throw new Error('Method not implemented.');
    }

}

@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptorService,
    multi: true,
  },
  ],
})

export class HttpInterceptorModule {

}
