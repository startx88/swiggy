import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  IAuthentication,
  IAuthResponse,
  IRole,
  IUser,
} from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<IUser>(null);
  url = environment.apiUrl + '/auth';
  redirectTo = new BehaviorSubject<string>('/');
  loggedIn = false;
  token: boolean;
  constructor(private http: HttpClient, private router: Router) {
    this.loggedIn = !!localStorage.getItem('token');
  }

  // login
  login(user: IAuthentication): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(this.url, user).pipe(
      catchError(this.errorHandler),
      map((response: IAuthResponse) => {
        const { data, message, expireIn, token } = response;
        this.loggedIn = !!token;
        this.user.next(data);
        this.redirection(data);
        return response;
      })
    );
  }

  // is authenticated
  get isAuthenticate() {
    return this.loggedIn;
  }

  // register
  register(user: IAuthentication): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(this.url + '/signup', user);
  }
  // forgot password
  forgotPassword(email: string): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(this.url + '/forgot-password', email);
  }
  // verify email verification

  // error handler
  errorHandler(error: HttpErrorResponse) {
    const errorMessage = 'Something went wrong';
    if (!error.error || !error.error.errors) {
      return throwError(errorMessage);
    }

    return throwError(error.error.errors);
  }

  // redirect user
  redirection(user: IUser): string {
    let url;
    switch (user.role) {
      case IRole.user:
        url = '/user';
        break;
      case IRole.admin:
        url = '/admin';
        break;
      case IRole.partner:
        url = '/partner';
        break;
      case IRole.chef:
        url = '/chef';
        break;
      default:
        url = '/';
        break;
    }
    this.redirectTo.next(url);
    this.router.navigate([url]);
    return url;
  }
}
