import {
  inject,
  addProviders,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, Headers } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TodoService } from './todo.service';

describe('Todo Service', () => {
  beforeEach(() => {
    addProviders([TodoService, BaseRequestOptions, MockBackend,
      {
        provide: Http,
        deps: [MockBackend, BaseRequestOptions],
        useFactory: function useFactory(backend, defaultOptions) {
          return new Http(backend, defaultOptions);
        }
      }]);
  });

  it('should have a base URL', inject([TodoService], (todoService: TodoService) => {
    expect(todoService.baseURL).toBe('http://localhost:3000/todos');
  }));

  it('should have a method to get all Todos',
    inject([TodoService, MockBackend], fakeAsync((todoService: TodoService, mockBackend:MockBackend) => {
      var res:Response;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe('http://localhost:3000/todos');
        let response = new ResponseOptions({body: '[{"id": 5, "item": "do the laundry", "completed": false}]'});
        c.mockRespond(new Response(response));
      });
      todoService.getTodos().subscribe((response) => {
        res = response;
      });
      tick();
      expect(res[0].id).toBe(5);
      expect(res[0].item).toBe('do the laundry');
      expect(res[0].completed).toBe(false);
    }))
  );

  it('should have a method to post a new Todo and then return all todos',
    inject([TodoService, MockBackend], fakeAsync((todoService: TodoService, mockBackend:MockBackend) => {
      var res:Response;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe('http://localhost:3000/todos');
        let response = new ResponseOptions({body: '[{"id": 50, "item": "get gas in car", "completed": false}]'});
        c.mockRespond(new Response(response));
      });
      todoService.addTodos({"id": 50, "item": "get gas in car", "completed": false}).subscribe((response) => {
        res = response;
      });
      tick();
      expect(res[0].id).toBe(50);
      expect(res[0].item).toBe('get gas in car');
      expect(res[0].completed).toBe(false);
    }))
  );

  it('should have a method to delete a Todo and then return all todos',
    inject([TodoService, MockBackend], fakeAsync((todoService: TodoService, mockBackend:MockBackend) => {
      var res:Response;
      mockBackend.connections.subscribe(c => {
        let response = new ResponseOptions({body: '[]'});
        c.mockRespond(new Response(response));
      });
      todoService.deleteTodo(1).subscribe((response) => {
        res = response;
      });
      tick();
      expect(res.length).toBe(0);
    }))
  );

});
