import { Router } from '@angular/router';
import { AuthReponseData, AuthService } from './../service/auth.service';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { Component, ComponentFactoryResolver, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertComponent } from '../dynamic-component/alert-component/alert.component';
import { PlaceholderDirective } from '../directive/placeholder.directive';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.css']
})
export class AuthComponentComponent implements OnInit,OnDestroy {

  @ViewChild(PlaceholderDirective,{static:false}) alertPlace:PlaceholderDirective;
  @ViewChild('authForm', { static: false }) authForm: NgForm;
  sub:Subscription;
  constructor(private authService: AuthService,
    private router: Router,
    private componentFactoryResolver:ComponentFactoryResolver) { }
  mode: string;
  error:string;
  ngOnInit( ): void {
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
  updateMode(mode: string) {
    this.mode = mode;

  }
  onSubmited() {
    let obsAuth:Observable<AuthReponseData>;
    if (!this.authForm.valid) {
      return
    }
    if(this.mode ==='signUp'){
      obsAuth= this.authService.signUp(this.authForm.value.mail, this.authForm.value.password);
    }else{
      obsAuth=this.authService.signIn(this.authForm.value.mail, this.authForm.value.password);
    }
    obsAuth.subscribe(
      resData => {
        console.log(resData);
        this.router.navigate(["/fetch-todo-list"]);
      },
      error => {
       this.error=error
       this.showError(this.error);
      }
    );
  }
  onHandleError(){
    this.error=null;
  }
  private showError(message:string){
    const alertComponentFactory=this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const alertContainer=this.alertPlace.viewContainerRef;
    alertContainer.clear();
    const componentRef=alertContainer.createComponent(alertComponentFactory);
    componentRef.instance.message=this.error;
    this.sub=componentRef.instance.close.subscribe(()=>{
      this.sub.unsubscribe();
      alertContainer.clear();
    })
  }
}
