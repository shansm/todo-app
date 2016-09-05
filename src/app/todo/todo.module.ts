import { NgModule }           from '@angular/core';
import { SharedModule }       from '../shared/shared.modules';
import { TodoComponent }   from './todo.component';
import { routing }            from './todo.routing';
import { ListOfTodosComponent } from './list/todo-list';

@NgModule({
  imports:      [ SharedModule, routing ],
  declarations: [ TodoComponent, ListOfTodosComponent]
})
export class TodoModule { }
