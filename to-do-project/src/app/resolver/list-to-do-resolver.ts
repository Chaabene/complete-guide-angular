import { TodoService } from './../service/todo.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Todo } from '../model/todo';
import { Observable } from 'rxjs';
@Injectable({providedIn:'root'})
export class ListToDoResolver implements Resolve<void> {
  constructor(public toDoService:TodoService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void | Observable<void> | Promise<void> {
    this.toDoService.getAllToDo();
  }

}
