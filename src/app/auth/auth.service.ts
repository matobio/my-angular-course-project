import { User } from './user.model';
import { credentials } from './../config/credentials';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const FIREBASE_API_SIGNUP_URL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

const FIREBASE_API_SIGNIN_URL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

export interface AuthResponseData {
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  registered: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string): Observable<any> {
    const API_KEY = credentials.API_KEY;

    return this.http
      .post<AuthResponseData>(`${FIREBASE_API_SIGNUP_URL}${API_KEY}`, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((responseData: AuthResponseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  logout(): void {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ): void {
    const expirationDate = new Date(new Date().getTime() + expiresIn);
    const user = new User(email, userId, token, expirationDate);

    this.user.next(user);
  }

  login(email: string, password: string): Observable<any> {
    const API_KEY = credentials.API_KEY;

    return this.http
      .post<AuthResponseData>(`${FIREBASE_API_SIGNIN_URL}${API_KEY}`, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((responseData: AuthResponseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<any> {
    console.log(errorResponse);
    let errorMessage = 'An error ocurred!';

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage =
          'The email address is already in use by another account.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage =
          'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage =
          'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        errorMessage =
          'The user account has been disabled by an administrator.';
        break;
    }
    return throwError(errorMessage);
  }
}
