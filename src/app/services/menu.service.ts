import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMenu } from '../models/menu.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menuUrl = environment.apiUrl + '/menu';
  menus: IMenu[] = [];
  menuChange = new Subject<IMenu[]>();
  constructor(private http: HttpClient) {}

  /**
   * Get menu by outlet
   */
  getMenusByOutlet(id: string): Observable<IMenu[]> {
    return this.http.get<IMenu[]>(this.menuUrl + '/' + id).pipe(
      catchError(this.errorHandler),
      tap((response: IMenu[]) => {
        this.menus = response;
        this.menuChange.next(this.menus.slice());
      })
    );
  }

  /**
   * Add outlet menu
   */
  addMenu(outletId: string, menu: IMenu): Observable<IMenu> {
    return this.http.post<IMenu>(this.menuUrl + '/' + outletId, menu).pipe(
      catchError(this.errorHandler),
      tap((response) => {
        this.menus.push(response);
        this.menuChange.next(this.menus.slice());
      })
    );
  }

  /**
   * Add outlet menu
   */
  updateMenu(outletId: string, menuId: string, menu: IMenu) {
    return this.http
      .post<IMenu>(`${this.menuUrl}/${outletId}/${menuId}`, menu)
      .pipe(
        catchError(this.errorHandler),
        tap((response) => {
          const index = this.menus.findIndex((x) => x.id === menuId);
          this.menus[index] = response;
          this.menuChange.next(this.menus.slice());
        })
      );
  }

  /**
   * Delete Menu
   */
  deleteMenu(outletId: string, menuId: string) {
    return this.http
      .delete<IMenu>(`${this.menuUrl}/${outletId}/${menuId}`)
      .pipe(
        catchError(this.errorHandler),
        tap((response) => {
          const index = this.menus.findIndex((x) => x.id === menuId);
          this.menus.splice(index, 1);
          this.menuChange.next(this.menus.slice());
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
