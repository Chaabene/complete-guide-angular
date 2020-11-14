import { catchError } from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let modifiedReq = req.clone({
     // headers: req.headers.append("auth", "AZY"),
      //body
      //method
      // params
      //url
      //..
    })
    return next.handle(modifiedReq).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    let errorMessage: string = error.error.error.message;
    switch (error.error.error.message) {
      case "EMAIL_NOT_FOUND": errorMessage = "email n'existe pas";
        break;
      case "EMAIL_EXISTS": errorMessage = "email existe déjà";
        break;
      case "INVALID_PASSWORD": errorMessage = "mot de passe invalide";
        break;
    }
    return throwError(errorMessage);
  }
}
