import { AuthService, AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let obsAuth: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      obsAuth = this.authService.login(email, password);
    } else {
      obsAuth = this.authService.signup(email, password);
    }

    obsAuth.subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
      },
      (errorMessage) => {
        this.isLoading = false;
        this.error = errorMessage;
      }
    );

    form.reset();
  }
}
