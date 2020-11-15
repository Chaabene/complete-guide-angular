import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ErrorInterceptorService } from '../interceptor/error-interceptor.service';
import { LoggingInterceptorService } from '../interceptor/logging-interceptor.service';

@NgModule({

  providers:[
    {
      provide:HTTP_INTERCEPTORS,
      useClass:LoggingInterceptorService,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:ErrorInterceptorService,
      multi:true
    }
  ]
})
export class CoreModule{

}
