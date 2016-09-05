import {
  async,
  TestBed
} from '@angular/core/testing';
import { TodoModel } from '../models';
import { HttpModule, JsonpModule } from '@angular/http';
import { SharedModule } from '../shared/shared.modules';
import { TodoComponent } from './todo.component';
import { routing } from './todo.routing';
import { ListOfTodosComponent } from './list/todo-list';
import { Observable } from 'rxjs/Observable';
import { MockBackend } from '@angular/http/testing';
import { TechStackService, TodoService } from '../services';

class MockTodoService {
  getTodos() {
    return new Observable((o) => {
      o.next([{'id': 1, 'item': 'cut the lawn', 'completed': false}]);
    });
  }
  addTodos() {
    return new Observable((o) => {
      o.next([{'id': 1, 'item': 'cut the lawn', 'completed': false}, {'id': 2, 'item': 'do laundry', 'completed': false}]);
    });
  }
}

describe('TodoComponent', () => {
  beforeEach(() => {
    this._todoService = new MockTodoService();
    TestBed.configureTestingModule({
      declarations: [TodoComponent, ListOfTodosComponent],
      providers:    [{provide: TodoService, useValue: this._todoService}, TechStackService],
      imports:      [SharedModule, routing, HttpModule],
    });
  });

  it('should create the Todo compnent', async(() => {
    let fixture = TestBed.createComponent(TodoComponent);
    fixture.detectChanges();
    let compiledComponent = fixture.debugElement.nativeElement;
    expect(compiledComponent).toBeDefined();
  }));

  it('should load todos when component is initialized', async(() => {
    let fixture = TestBed.createComponent(TodoComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.componentInstance.todos).toBeDefined();
    expect(fixture.debugElement.componentInstance.todos.length).toEqual(1);
  }));

  it('should list technologies used to build this app', async(() => {
    let fixture = TestBed.createComponent(TodoComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.componentInstance.techStack).toContain('Angular');
  }));

});
