import { tap } from 'rxjs/operators';
import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggingInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("*********************request***************************");
    console.log(req.url);
    return next.handle(req).pipe(tap(events => {
      if (events.type == HttpEventType.Response) {
        console.log("*********************response***************************");
        console.log(events.body);
      }
    }));
  }

}
