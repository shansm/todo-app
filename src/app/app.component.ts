import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
// brings in styling for entire app
import '../style/app.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({

  selector: 'my-todo-app',
  directives: [...ROUTER_DIRECTIVES],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})

export class AppComponent {
}
