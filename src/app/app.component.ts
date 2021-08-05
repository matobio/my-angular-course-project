import { LoggingService } from './logging.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'my-angular-course-project';
  loadedFeature = 'recipe';

  element: any;

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
    this.loggingService.pringLog('Hello from AppComponent ngOnInit');
  }

  @HostListener('window:click', ['$event.target'])
  onClick(targetElement: any): void {
    this.element = targetElement;
  }

  @HostListener('window:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent): void {
    if (event.ctrlKey && event.shiftKey && event.altKey) {
      console.log(this.element);
      console.log(this.element.text);
    }
  }
  onNavigated(feature: string): void {
    this.loadedFeature = feature;
  }
}
