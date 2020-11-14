import { ToDoByKeyResolver } from './resolver/to-do-by-key-resolver';
import { FetchListToDoComponent } from './list-to-do/fetch-list-to-do/fetch-list-to-do.component';
import { ListToDoResolver } from './resolver/list-to-do-resolver';
import { ListToDoComponent } from './list-to-do/list-to-do.component';
import { AuthComponentComponent } from './auth-component/auth-component.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './gaurd/auth-guard.service';

const routes: Routes = [
  { path: '', component: AuthComponentComponent },
  {
    path: 'fetch-todo-list', component: FetchListToDoComponent, resolve: { listTodo: ListToDoResolver }
    ,canActivate:[AuthGuardService],
    children: [
      { path: 'new', component: ListToDoComponent },
      { path: ':key', component: ListToDoComponent, resolve: { todo: ToDoByKeyResolver } }

    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
