import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../shared-services';
import { TodoModel } from '../models/todo-model';

@Component({

  selector: 'my-list-of-todos',
  styleUrls: ['./todo.component.scss'],
  template: `
    <ul *ngIf='todos.length'>
      <li *ngFor='let todo of todos; let i = index'>
        <p [class.strike-thru]="todo.completed">{{todo.item}} {{todo.id}}
          <button type="button" class="close" aria-label="Close" (click)='deleteTodo(todo.id, i)'>
            <span aria-hidden="true">&times;</span>
          </button>
        </p>
      </li>
    </ul>
  `,

})
export class ListOfTodosComponent implements OnInit {

  strikeThru: boolean = false;
  @Input() todos: Array<TodoModel>;

  constructor(private _todoService: TodoService) {
  }

  ngOnInit() {
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
