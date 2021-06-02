import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: IUser[] = [];
  userChange = new Subject<IUser[]>();
  url = environment.apiUrl + '/auth/users';
  constructor(private http: HttpClient) {}

  /*******************************
   * Get all users
   */

  loadUsers() {
    return this.http.get(this.url).pipe(
      catchError(this.errorHandler),
      pipe(
        tap((response: IUser[]) => {
          console.log(response);
          this.users = response;
          this.userChange.next(this.users.slice());
        })
      )
    );
  }

  // error handler
  errorHandler(error: HttpErrorResponse) {
    const errorMessage = 'Something went wrong';
    if (!error.error || !error.error.errors) {
      return throwError(errorMessage);
    }
    return throwError(error.error.errors);
  }
}
