import { AuthService } from './auth.service';
import { User } from './../model/user';
import { exhaustMap, map, take } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Todo } from './../model/todo';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  listTodo = new BehaviorSubject<Todo[]>([]);

  saveTodo(todo: Todo) {
    let params = new HttpParams();
    return this.authService.user
      .pipe(
        take(1),
        exhaustMap(user => {
          params = params.append("auth", user.token);
          return this.http.post<Todo>("https://auth-7675b.firebaseio.com/todos.json", todo, {
            params: params
          })
        })
      )
      .subscribe(data => { this.getAllToDo(); });
  }
  getAllToDoObservable() {
    let params = new HttpParams();
    return this.authService.user
      .pipe(take(1),
        exhaustMap(user => {
          params = params.append('auth', user.token)
          return this.http.get<Todo>("https://auth-7675b.firebaseio.com/todos.json", { params: params })
        }),
        map(resData => {
          const todoArray = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              todoArray.push({ ...resData[key], id: key });
            }
          }
          return todoArray;
        })
      )

  }
  getAllToDo() {
    this.getAllToDoObservable()
      .subscribe(todos => {
        this.listTodo.next(todos);
      });
  }
  removeToDo(key: string) {
    let params = new HttpParams();
    return this.authService.user
      .pipe(
        take(1),
        exhaustMap(user => {
          params = params.append('auth', user.token);
          return this.http.delete("https://auth-7675b.firebaseio.com/todos/" + key + ".json", {
            params: params
          })
        }),
        exhaustMap(data => {
          return this.getAllToDoObservable();
        })
      ).subscribe(todos => {
        this.listTodo.next(todos);
      });
  }
  updateToDo(key: string, todo: Todo) {
    let params = new HttpParams();
    return this.authService.user
      .pipe(
        take(1),
        exhaustMap(user => {
          params = params.append('auth', user.token);
          return this.http.patch("https://auth-7675b.firebaseio.com/todos/" + key + ".json", todo, {
            params: params
          })
        })
      )
      .subscribe(resData => {
        this.getAllToDo();
      });
  }
  getToDoByKey(key: string) {
    let params = new HttpParams();
    return this.authService.user
      .pipe(take(1),
        exhaustMap(user => {
          params = params.append('auth', user.token)
          return this.http.get<Todo>("https://auth-7675b.firebaseio.com/todos/" + key + ".json", { params: params })
        }),
        map(data => {
          return { ...data, id: key }
        }));
  }
}
