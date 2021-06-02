import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISubCategory } from '../models/subcategory.model';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService {
  subcategories: ISubCategory[] = [];
  categoryChange = new Subject<ISubCategory[]>();
  url = environment.apiUrl + '/subcategory';
  constructor(private http: HttpClient) {}

  // Get categories
  loadData(query?: string): Observable<ISubCategory[]> {
    return this.http.get<ISubCategory[]>(this.url).pipe(
      catchError(this.errorHandler),
      tap((response: ISubCategory[]) => {
        response.sort((a, b) => a.title.localeCompare(b.title));
        this.subcategories = response;
        this.categoryChange.next(this.subcategories.slice());
      })
    );
  }

  // add / update category
  addUpdateItem(
    item: ISubCategory,
    id?: string,
    status?: string
  ): Observable<ISubCategory> {
    console.log('item', item);
    const formdata = new FormData();
    formdata.append('category', item.category);
    formdata.append('title', item.title);
    formdata.append('image', item.image);
    formdata.append('description', item.description);
    if (status === 'UPDATED') {
      return this.http.post<ISubCategory>(`${this.url}/${id}`, formdata).pipe(
        catchError(this.errorHandler),
        tap((response: ISubCategory) => {
          const index = this.subcategories.findIndex((x) => x.id === id);
          this.subcategories[index] = response;
          this.categoryChange.next(this.subcategories.slice());
        })
      );
    } else {
      return this.http.post<ISubCategory>(this.url, formdata).pipe(
        catchError(this.errorHandler),
        tap((response: ISubCategory) => {
          this.subcategories.push(response);
          this.categoryChange.next(this.subcategories.slice());
        })
      );
    }
  }

  // delete cuisines
  deleteItem(id: string) {
    return this.http.delete(`${this.url}/${id}`).pipe(
      catchError(this.errorHandler),
      tap(() => {
        const index = this.subcategories.findIndex((x) => x.id === id);
        this.subcategories.splice(index, 1);
        this.categoryChange.next(this.subcategories.slice());
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
