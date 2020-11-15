import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponentComponent } from './auth-component/auth-component.component';
import { PlaceholderDirective } from './directive/placeholder.directive';
import { AlertComponent } from './dynamic-component/alert-component/alert.component';
import { HeaderComponent } from './header/header.component';
import { CoreModule } from './loaded-module/core.module';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponentComponent,
    PlaceholderDirective,
    HeaderComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CoreModule
  ],
  providers: [],
  entryComponents:[ AlertComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
