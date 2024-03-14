import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../Service-Repo/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService : AuthenticationService, private toastr : ToastrService,
    private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    if(Boolean(token)){
      request = request.clone({
        setHeaders : { Authorization : `Bearer ${token}`}
      });
    }
    return next.handle(request)
    .pipe(
      catchError((error : any) => {
        if(error instanceof HttpErrorResponse){
          if(error.status === 401){
            this.toastr.warning("Login is Expired!! ", "Please Login Again");
            this.authService.logOut();
            this.router.navigate(['/login']);
          }
        }
        return throwError(() => new Error("Some Error Occured"));
      })
    );
  }
}
