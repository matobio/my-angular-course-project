import { AuthService } from './auth/auth.service';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'my-angular-course-project';
  loadedFeature = 'recipe';

  element: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoLogin();
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
