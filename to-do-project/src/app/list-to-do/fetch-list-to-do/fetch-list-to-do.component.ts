import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TodoService } from './../../service/todo.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from 'src/app/model/todo';

@Component({
  selector: 'app-fetch-list-to-do',
  templateUrl: './fetch-list-to-do.component.html',
  styleUrls: ['./fetch-list-to-do.component.css']
})
export class FetchListToDoComponent implements OnInit, OnDestroy {
  listToDo: Todo[] = [];
  subs: Subscription;
  constructor(private todoService: TodoService, private router :Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.subs = this.todoService.listTodo.subscribe(resData => this.listToDo = resData);
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  onRemoveToDo(id: string) {
    this.todoService.removeToDo(id);
  }
  onUpdateToDo(id: string, index:number) {
   this.router.navigate([id],{relativeTo:this.route});
  }
  newToDo(){
    this.router.navigate(["new"],{relativeTo:this.route});
  }

}
