import { MockBackend } from '@angular/http/testing';
import { Http, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { TodoService } from './todo.service';
import { tick, async, inject, TestBed, fakeAsync } from '@angular/core/testing';
import { HttpModule, JsonpModule } from '@angular/http';

describe('TodoService', () => {
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        }, deps: [MockBackend, BaseRequestOptions]
        },
        {provide: TodoService, useClass: TodoService},
        {provide: MockBackend, useClass: MockBackend},
        {provide: BaseRequestOptions, useClass: BaseRequestOptions}
      ]
    });
  });

  it('should have a base URL', inject([TodoService], (todoService: TodoService) => {
    expect(todoService.baseURL).toBe('http://localhost:3000/todos');
  }));

  it('should have a method to get all Todos',
    fakeAsync(inject([TodoService, MockBackend], (todoService: TodoService, mockBackend: MockBackend) => {
      let res: Response;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe('http://localhost:3000/todos');
        let response = new ResponseOptions({body: `[{"id": 5, "item": "do the laundry", "completed": false}]`});
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
    fakeAsync(inject([TodoService, MockBackend], (todoService: TodoService, mockBackend: MockBackend) => {
      let res: Response;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe('http://localhost:3000/todos');
        let response = new ResponseOptions({body: `[{"id": 50, "item": "get gas in car", "completed": false}]`});
        c.mockRespond(new Response(response));
      });
      todoService.addTodos({'id': 50, 'item': 'get gas in car', 'completed': false}).subscribe((response) => {
        res = response;
      });
      tick();
      expect(res[0].id).toBe(50);
      expect(res[0].item).toBe('get gas in car');
      expect(res[0].completed).toBe(false);
    }))
  );

  it('should have a method to delete a Todo and then return all todos',
    inject([TodoService, MockBackend], fakeAsync((todoService: TodoService, mockBackend: MockBackend) => {
      let res: Response;
      mockBackend.connections.subscribe(c => {
        let response = new ResponseOptions({body: '[]'});
        c.mockRespond(new Response(response));
      });
      todoService.deleteTodo(1).subscribe((response) => {
        res = response;
      });
      tick();
      expect(res).toEqual([]);
    }))
  );
});
