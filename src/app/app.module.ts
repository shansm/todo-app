import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
/* App Root */
import { AppComponent }   from './app.component';
/* Feature Modules */
import { TodoModule }  from './todo/todo.module';
/* Shared Modules */
import { SharedModule }   from './shared/shared.modules';
/* Root app routing */
import { routing }        from './app.routes';
@NgModule({
  imports: [
    BrowserModule,
    TodoModule,
    routing,
    SharedModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
