import { Component, OnInit } from '@angular/core';
import { TechStackService, TodoService } from '../shared-services';
import { TodoModel } from '../models/todo-model';
import { ListOfTodosComponent } from './todo-list';
// not used in the component, but needed in the template for validation
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

@Component({

  selector: 'my-todo-form',
  template: require('!jade!./todo-form.component.jade')(),
  styleUrls: ['./todo.component.scss'],
  directives: [ListOfTodosComponent]

})
export class TodoComponent implements OnInit {

  model: TodoModel = new TodoModel();
  submitted: boolean = false;
  active: boolean = true;
  todos: Array<TodoModel> = [];

  constructor(private _techStack: TechStackService, private _todoService: TodoService) {
  }

  ngOnInit() {
    this._todoService.getTodos().subscribe(
      data => {
        this.todos = data;
      }
    );
  }

  onSubmit() {
    this.active = false;
    this.submitted = true;
    this._todoService.addTodos(this.model).subscribe(
      data => {
        this.todos = data;
      }
    );
    this.model = new TodoModel();
    setTimeout(() => this.active = true, 0);
  }
}
