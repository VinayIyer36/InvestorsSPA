import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  /**
    * Creates an instance of TokenInterceptorService
    * @param authService 
    * @param toastr 
    * @param spinner 
    */
  constructor(private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  /**
* Intercept HTTP request
* @param request 
* @param next 
* @returns Access token
*/
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    });
    this.spinner.show();
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.toastr.error(error?.error?.Message);
        return throwError(error);
      }),
      finalize(() =>
        setTimeout(() => {
          this.spinner.hide();
        }, 500))
    );
  }
}
