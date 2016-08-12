import { NgModule,
         ModuleWithProviders } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { TechStackService, TodoService } from '../services';
@NgModule({
  imports:      [ CommonModule ],
  declarations: [  ],
  exports:      [ CommonModule, FormsModule ],
  providers:    [ TechStackService, TodoService ]
})
export class SharedModule {}
