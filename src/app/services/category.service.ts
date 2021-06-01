import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICategory } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories: ICategory[] = [];
  categoryChange = new Subject<ICategory[]>();
  url = environment.apiUrl + '/category';
  constructor(private http: HttpClient) {}

  // Get categories
  loadCategories(query?: string): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.url).pipe(
      catchError(this.errorHandler),
      tap((response: ICategory[]) => {
        response.sort((a, b) => a.title.localeCompare(b.title));
        this.categories = response;
        this.categoryChange.next(this.categories.slice());
      })
    );
  }

  // add / update category
  addUpdateCategory(
    category: ICategory,
    id?: string,
    status?: string
  ): Observable<ICategory> {
    const formdata = new FormData();
    formdata.append('title', category.title);
    formdata.append('image', category.image);
    formdata.append('description', category.description);
    if (status === 'UPDATED') {
      return this.http.post<ICategory>(`${this.url}/${id}`, formdata).pipe(
        catchError(this.errorHandler),
        tap((response: ICategory) => {
          const index = this.categories.findIndex((x) => x.id === id);
          this.categories[index] = response;
          this.categoryChange.next(this.categories.slice());
        })
      );
    } else {
      return this.http.post<ICategory>(this.url, formdata).pipe(
        catchError(this.errorHandler),
        tap((response: ICategory) => {
          this.categories.push(response);
          this.categoryChange.next(this.categories.slice());
        })
      );
    }
  }

  // delete cuisines
  deleted(id: string) {
    return this.http.delete(`${this.url}/${id}`).pipe(
      catchError(this.errorHandler),
      tap(() => {
        const index = this.categories.findIndex((x) => x.id === id);
        this.categories.splice(index, 1);
        this.categoryChange.next(this.categories.slice());
      })
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
