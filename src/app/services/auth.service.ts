import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAuthentication, IAuthResponse, IUser } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<IUser>();
  url = environment.apiUrl + '/auth';
  constructor(private http: HttpClient) {}

  // login
  login(user: IAuthentication): Observable<IAuthResponse> {
    return this.http
      .post<IAuthResponse>(this.url, user)
      .pipe(catchError(this.errorHandler));
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
}
