import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { AlertComponent } from './../shared/alert/alert.component';
import { AuthService, AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnDestroy {
  @ViewChild(PlaceholderDirective)
  alertHost: PlaceholderDirective;

  private closeSub = new Subscription();

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

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
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        this.isLoading = false;
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
      }
    );

    form.reset();
  }

  onHandlerError(): void {
    this.error = null;
  }

  private showErrorAlert(errorMessage: string): void {
    const alertComponentFctory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef =
      hostViewContainerRef.createComponent(alertComponentFctory);

    componentRef.instance.message = errorMessage;
    this.closeSub = componentRef.instance.closeEvent.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
