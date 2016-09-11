import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../../services';
import { TodoModel } from '../../models';

@Component({

  selector: 'my-list-of-todos',
  styleUrls: ['../todo.component.scss'],
  template: `
    <ul *ngIf='todos.length' class="todos-list">
      <li *ngFor='let todo of todos; let i = index'>
        <p [class.strike-thru]="todo.completed">{{todo.item}}
          <button type="button" class="close" aria-label="Close" (click)='deleteTodo(todo.id, i)'>
            <span aria-hidden="true">&times;</span>
          </button>
        </p>
      </li>
    </ul>
  `,

})
export class ListOfTodosComponent {

  strikeThru: boolean = false;
  @Input() todos: Array<TodoModel>;

  constructor(private _todoService: TodoService) {
  }

  deleteTodo(id, i) {
    this.todos[i].completed = true;
    this._todoService.deleteTodo(id).subscribe(
      data => {
        this.todos = data;
        this.strikeThru = false;
      }
    );
  }
}
