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
  clearTimer;
  constructor(private http: HttpClient, private router: Router) {
    this.loggedIn = !!localStorage.getItem('token');
  }

  // login
  login(user: IAuthentication): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(this.url, user).pipe(
      catchError(this.errorHandler),
      map((response: IAuthResponse) => {
        const { data, expireIn, token } = response;
        this.loggedIn = !!token;
        const expireTime = new Date(new Date().getTime() + expireIn * 1000);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('expireTime', JSON.stringify(expireTime));
        this.user.next(data);
        this.redirection(data);
        this.autoLogout(expireIn * 1000); // start timing for auto logout
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

  // auto login
  autoLogin() {
    const user = JSON.parse(localStorage.getItem('user'));
    const expireTime = new Date(JSON.parse(localStorage.getItem('expireTime')));
    const token = localStorage.getItem('token');
    if (!token || new Date() > expireTime) {
      return;
    }

    if (token) {
      this.loggedIn = true;
      this.user.next(user);
      this.autoLogout(expireTime.getTime() - new Date().getTime());
    }
    return null;
  }

  // logout
  logout() {
    this.user.next(null);
    this.loggedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('expireTime');
    this.router.navigate(['/auth']);
    if (this.clearTimer) {
      clearTimeout(this.clearTimer);
    }
    this.clearTimer = null;
  }

  // auto logout
  autoLogout(timer: number) {
    this.clearTimer = setTimeout(() => {
      this.logout();
    }, timer);
  }

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
