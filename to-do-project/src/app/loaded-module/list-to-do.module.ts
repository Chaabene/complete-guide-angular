import { listToDoRoutingModule } from './list-to-do-routing.module';
import { ListToDoComponent } from './../list-to-do/list-to-do.component';
import { NgModule } from '@angular/core';
import { ColorRowTableDirective } from '../directive/color-row-table.directive';
import { FetchListToDoComponent } from '../list-to-do/fetch-list-to-do/fetch-list-to-do.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({

  declarations:[
    ListToDoComponent,
    ColorRowTableDirective,
    FetchListToDoComponent,

  ],
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    listToDoRoutingModule,
  ],
  exports:[// c'est optionnel pacque les composants ne sont pas utilisés à l'exterieur de list-to-do-module
    ListToDoComponent,
    FetchListToDoComponent
  ]
})
export class listToDoModule{

}
