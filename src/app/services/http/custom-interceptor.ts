import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';
import { CustomParamEncoder } from './CustomParamEncoder';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private auth: AuthService,
    private cookie: CookieService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers: HttpHeaders = request.headers;
    let contentType: string;

    if (request.body !== null) {
      if (headers.has('Content-Type')) {
        contentType = headers.get('Content-Type');
      }
      else if ((typeof request.body === 'object' || Array.isArray(request.body))) {
        contentType = 'application/json';
      }
      else if (typeof request.body === 'string') {
        contentType = 'application/x-www-form-urlencoded;charset=UTF8';
      }
      else if (request.headers.has('No-Content')) {
        headers = request.headers.delete('No-Content');
      }
    }

    if (typeof contentType !== 'undefined')
      headers = headers.set('Content-Type', contentType);

    const csrfToken = this.cookie.get('XSRF-TOKEN');

    if (typeof csrfToken !== 'undefined') {
      headers = headers.set('X-XSRF-TOKEN', csrfToken);
    }

    const customReq = request.clone({
      withCredentials: true,
      params: new HttpParams({ encoder: new CustomParamEncoder, fromString: request.params.toString() }),
      headers: headers
    });
    return next.handle(customReq)
      .pipe(catchError(e => {
        if (e instanceof HttpErrorResponse) {
          switch (e.status) {
            case 401:
              this.auth.clearAuth();
              this.router.navigateByUrl('/');
              Swal.fire({
                title: 'Authentication Error',
                text: "Login to Continue",
                icon: 'warning',
                confirmButtonColor: '#d33'
              });
              break;

            default:
              console.error(!environment.production && e.error);
              Swal.fire({
                title: 'Error',
                text: 'An Error occured while Processing your Request!!!',
                icon: 'error',
                confirmButtonColor: '#d33'
              });
              break;
          }
        }

        return of(e);
      }));
  }
}
