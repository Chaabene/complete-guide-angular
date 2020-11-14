import { Injectable } from '@angular/core';
import { TodoService } from './../service/todo.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo';
@Injectable({providedIn:'root'})
export class ToDoByKeyResolver implements Resolve<Todo>{

  constructor(private todoService: TodoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Todo | Observable<Todo> | Promise<Todo> {
    let key = route.params['key'];
    console.log(key)
    return this.todoService.getToDoByKey(key);
  }

}
