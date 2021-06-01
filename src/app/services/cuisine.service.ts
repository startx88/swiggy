import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICuisine } from '../models/cuisine.model';

@Injectable({
  providedIn: 'root',
})
export class CuisineService {
  url: string = environment.apiUrl + '/cuisine';
  cuisines = new BehaviorSubject<ICuisine[]>(null);

  constructor(private http: HttpClient) {}

  // get cuisines
  getCuisines(query: string = '') {
    return this.http.get(this.url).pipe(
      catchError(this.errorHandler),
      tap((response: ICuisine[]) => {
        response.sort((a, b) => a.title.localeCompare(b.title));
        this.cuisines.next(response);
      })
    );
  }

  // add / update cuisne
  addUpdateCuisine(
    cuisine: ICuisine,
    id?: string,
    status?: string
  ): Observable<ICuisine> {
    console.log(cuisine);
    const form = new FormData();
    form.append('title', cuisine.title);
    form.append('image', cuisine.image);
    if (status === 'UPDATED') {
      return this.http.post<ICuisine>(`${this.url}/${id}`, form).pipe(
        catchError(this.errorHandler),
        tap((response: ICuisine) => {
          console.log(response);
          console.log('value', this.cuisines.value);
        })
      );
    } else {
      return this.http
        .post<ICuisine>(this.url, form)
        .pipe(catchError(this.errorHandler));
    }
  }

  // delete cuisines
  deleted(id: string) {
    return this.http
      .delete(`${this.url}/${id}`)
      .pipe(catchError(this.errorHandler));
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
