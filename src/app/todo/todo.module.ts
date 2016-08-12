import { NgModule }           from '@angular/core';
import { SharedModule }       from '../shared/shared.modules';
import { TodoComponent }   from './todo.component';
import { routing }            from './todo.routing';

@NgModule({
  imports:      [ SharedModule, routing ],
  declarations: [ TodoComponent]
})
export class TodoModule { }
