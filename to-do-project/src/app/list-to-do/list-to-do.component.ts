import { ActivatedRoute, Router, Data } from '@angular/router';
import { TodoService } from './../service/todo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from './../service/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from '../model/todo';

@Component({
  selector: 'app-list-to-do',
  templateUrl: './list-to-do.component.html',
  styleUrls: ['./list-to-do.component.css']
})
export class ListToDoComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  toDoForm: FormGroup;
  isNew: boolean = true;
  constructor(private authService: AuthService, private todoService: TodoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.toDoForm = new FormGroup({
      todo: new FormControl(null, [Validators.required, this.checkTodoLength.bind(this)
      ]),
      date: new FormControl(null, [Validators.required]),
      id: new FormControl(null)
    });

    this.userSub = this.authService.user.subscribe(
      user => {

      }
    );

    this.route.data.subscribe((data: Data) => {
      this.isNew = true;
      if (data["todo"]) {
        this.isNew = false;
        (<FormControl>this.toDoForm.get("todo")).setValue(data["todo"].todo);
        (<FormControl>this.toDoForm.get("date")).setValue(data["todo"].date);
        (<FormControl>this.toDoForm.get("id")).setValue(data["todo"].id);
      }
    })
  }
  onSubmited(): void {
    let todo: Todo;
    if (this.toDoForm.valid) {
      todo = new Todo(this.toDoForm.value.todo, this.toDoForm.value.date);
      if (this.isNew) {
        this.todoService.saveTodo(todo);
      } else {
       this.todoService.updateToDo(this.toDoForm.value.id, todo);
      }
    }
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  checkTodoLength(control: FormControl): { [s: string]: boolean } {
    if (control.value != null && control.value.length > 20) {
      return { lengthValidatorTodo: true };
    }
    return null;
  }
}
