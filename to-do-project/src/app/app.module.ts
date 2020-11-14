import { LoggingInterceptorService } from './interceptor/logging-interceptor.service';
import { ErrorInterceptorService } from './interceptor/error-interceptor.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponentComponent } from './auth-component/auth-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListToDoComponent } from './list-to-do/list-to-do.component';
import { HeaderComponent } from './header/header.component';
import { FetchListToDoComponent } from './list-to-do/fetch-list-to-do/fetch-list-to-do.component';
import { ColorRowTableDirective } from './directive/color-row-table.directive';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponentComponent,
    ListToDoComponent,
    HeaderComponent,
    FetchListToDoComponent,
    ColorRowTableDirective

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,HttpClientModule,ReactiveFormsModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:LoggingInterceptorService,
    multi:true
  },
  {
    provide:HTTP_INTERCEPTORS,
    useClass:ErrorInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
