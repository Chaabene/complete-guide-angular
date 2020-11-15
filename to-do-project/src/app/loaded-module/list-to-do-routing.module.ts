import { Routes, RouterModule } from '@angular/router';
import { ListToDoComponent } from '../list-to-do/list-to-do.component';
import { NgModule } from '@angular/core';
import { ColorRowTableDirective } from '../directive/color-row-table.directive';
import { PlaceholderDirective } from '../directive/placeholder.directive';
import { HeaderComponent } from '../header/header.component';
import { FetchListToDoComponent } from '../list-to-do/fetch-list-to-do/fetch-list-to-do.component';
import { AuthGuardService } from '../gaurd/auth-guard.service';
import { ListToDoResolver } from '../resolver/list-to-do-resolver';
import { ToDoByKeyResolver } from '../resolver/to-do-by-key-resolver';

const route:Routes=[{
  path: '', component: FetchListToDoComponent, resolve: { listTodo: ListToDoResolver }
  ,canActivate:[AuthGuardService],
  children: [
    { path: 'new', component: ListToDoComponent },
    { path: ':key', component: ListToDoComponent, resolve: { todo: ToDoByKeyResolver } }

  ]
}];
@NgModule({
imports:[RouterModule.forChild(route)],
exports:[RouterModule]
})
export class listToDoRoutingModule{

}
