import { Router } from '@angular/router';
import { AuthReponseData, AuthService } from './../service/auth.service';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.css']
})
export class AuthComponentComponent implements OnInit {

  @ViewChild('authForm', { static: false }) authForm: NgForm;
  constructor(private authService: AuthService,private router: Router) { }
  mode: string;
  error:string;
  ngOnInit( ): void {
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
      }
    );
  }
}
