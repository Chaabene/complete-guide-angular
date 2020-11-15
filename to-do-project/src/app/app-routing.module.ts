import { AuthComponentComponent } from './auth-component/auth-component.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', component: AuthComponentComponent },
  {path:'fetch-todo-list',loadChildren:()=>import('./loaded-module/list-to-do.module').then(m=>m.listToDoModule)}
  // {path:'fetch-todo-list',loadChildren:'./loaded-module/list-to-do.module#listToDoModule'}// syntaxe alternative
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
