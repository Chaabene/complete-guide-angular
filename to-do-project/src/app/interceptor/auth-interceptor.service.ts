import { take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './../service/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * une solution pour ne pas rajouter le token à chaque  appel
 */
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let params = new HttpParams();
    return this.authService.user
      .pipe(take(1),
        exhaustMap(user => {
          if(!user){
            return next.handle(req);
          }
          params = params.append('auth', user.token)
          const modifiedReq=req.clone({
            params:params
          });
          return next.handle(modifiedReq);
        }));
  }
}
