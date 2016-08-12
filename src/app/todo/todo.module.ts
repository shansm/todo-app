import { NgModule }           from '@angular/core';
import { SharedModule }       from '../shared/shared.modules';
import { TodoComponent }   from './todo.component';
import { routing }            from './todo.routing';
import { TechStackService, TodoService } from '../services';

@NgModule({
  imports:      [ SharedModule, routing ],
  declarations: [ TodoComponent],
  providers:    [TechStackService, TodoService]
})
export class TodoModule { }
