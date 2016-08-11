import { Injectable } from '@angular/core';
import { TodoModel } from '../models/';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TodoService {
  baseURL = 'http://localhost:3000/todos';
  constructor(private _http: Http) { }
  getTodos() {
    return this._http.get(this.baseURL).map((res: Response) => res.json());
  }
  addTodos(data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.baseURL, JSON.stringify(data), {headers: headers})
    .flatMap(() => this.getTodos());
  }
  deleteTodo(id) {
    return this._http.delete(`${this.baseURL}/${id}`)
    .flatMap(() => this.getTodos());
  }
}
