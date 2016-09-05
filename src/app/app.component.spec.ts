import {
  async,
  TestBed
} from '@angular/core/testing';
import { HttpModule, JsonpModule } from '@angular/http';
import { SharedModule } from './shared/shared.modules';
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { MockBackend } from '@angular/http/testing';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports:      [SharedModule, routing, HttpModule, JsonpModule],
    });
  });

  it('should create the App compnent', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiledComponent = fixture.debugElement.nativeElement;
    expect(compiledComponent).toBeDefined();
  }));

});
