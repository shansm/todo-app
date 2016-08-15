import {
  inject,
  addProviders,
  fakeAsync,
  tick,
  TestComponentBuilder,
  ComponentFixture
} from '@angular/core/testing';
import { provide } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoModel } from '../models';
import { TodoComponent } from './todo.component';
import { TechStackService, TodoService } from '../services';
import { BaseRequestOptions, Http, Response, ResponseOptions, Headers } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

const mockHttpProvider = {
  deps: [ MockBackend, BaseRequestOptions ],
  useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
    return new Http(backend, defaultOptions);
  }
};

class MockTechStackService {
  technologies: 'AngularJS';
}

class MockTodoService {
  getTodos: () => Array<TodoModel>;
}

describe('TodoComponent', () => {
  beforeEach(() => {
    addProviders([TodoComponent, TechStackService, TodoService, BaseRequestOptions, MockBackend,
      provide(Http, mockHttpProvider)]),
      provide(TechStackService, {useClass: MockTechStackService}),
      provide(TodoService, {useClass: MockTodoService});
  });

   it('should call the getAllUsers method from the UserService',
    inject([TestComponentBuilder, TechStackService, TodoService],
      fakeAsync((tcb: TestComponentBuilder, mockTechStackService: TechStackService, mockTodoService: TodoService) => {
      spyOn(mockTodoService, 'getTodos');
      tcb
        .createAsync(TodoComponent)
        .then((fixture: ComponentFixture<any>) => {
          tick();
          fixture.detectChanges();
          expect(mockTodoService.getTodos).toHaveBeenCalled();
        });
    }))
  );
});
