import { Router } from '@angular/router';
import { User } from './../model/user';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';

export interface AuthReponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenEpirationTimer:any;
  constructor(private http: HttpClient,private router:Router) { }

  signUp(email: string, password: string) {
    return this.http
      .post<AuthReponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCmpoAD1XkuNM-ml5lZFbz7k_Qc_8h3UCk',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      ).pipe(
        //  catchError(this.handleError),
        tap(resData => {
          this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        })
        //   catchError(error => {
        //   let errorMessage:string="error inconnue"
        //   switch(error.error.error.message){
        //     case "EMAIL_EXISTS": errorMessage="email existe déjà"
        //   }
        //   return throwError(errorMessage);
        // })
      )
  }

  signIn(email: string, password: string) {
    return this.http
      .post<AuthReponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCmpoAD1XkuNM-ml5lZFbz7k_Qc_8h3UCk',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      ).pipe(
        // catchError(this.handleError),
        tap(resData => {
          this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        })
        //    catchError(error => {
        //    let errorMessage:string="error inconnue"
        //    switch(error.error.error.message){
        //      case "EMAIL_NOT_FOUND": errorMessage="email n'existe pas"
        //    }
        //    return throwError(errorMessage);
        //  })
      )
  }
  private handleAuth(email: string, localId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, localId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if( this.tokenEpirationTimer){
      clearTimeout( this.tokenEpirationTimer);
    }
    this.router.navigate(['']);
  }
  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration=new Date(userData._tokenExpirationDate).getTime()-new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }
  autoLogout(expirationDuration: number) {
   this.tokenEpirationTimer= setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

}
