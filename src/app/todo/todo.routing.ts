import { RouterModule } from '@angular/router';
import { TodoComponent }   from './todo.component';

export const routing = RouterModule.forChild([
  { path: 'todos', component: TodoComponent}
]);
