import { credentials } from './../config/credentials';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const FIREBASE_API_SIGNUP_URL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

interface AuthResponseData {
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<any> {
    const API_KEY = credentials.API_KEY;

    return this.http.post<AuthResponseData>(
      `${FIREBASE_API_SIGNUP_URL}${API_KEY}`,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}
