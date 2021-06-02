import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMenu, IOutlet } from '../models/outlet.model';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root',
})
export class OutletService {
  outlets: IOutlet[];
  outletsChange = new Subject<IOutlet[]>();
  url = environment.apiUrl + '/outlet';
  constructor(private http: HttpClient, private menuService: MenuService) {}

  /**********
   * get all outlets
   */
  loadOutlets(): Observable<IOutlet[]> {
    return this.http.get<IOutlet[]>(this.url).pipe(
      catchError(this.errorHandler),
      map((response: any) => {
        let outlets = response;
        for (let i = 0; i < outlets.length; i++) {
          this.menuService
            .getMenusByOutlet(outlets[i].id)
            .subscribe((menus) => {
              outlets[i].menu = menus.filter(
                (x) => x.restaurant == outlets[i].id
              );
            });
        }
        return outlets;
      })
    );
  }

  /**
   * get outlet via id
   * @param outlet
   * @returns
   */

  geOutletById(id: string): Observable<IOutlet> {
    return this.http.get<IOutlet>(this.url + '/' + id).pipe(
      catchError(this.errorHandler),
      map((response: any) => {
        let outlets = response;
        this.menuService.getMenusByOutlet(outlets.id).subscribe((menus) => {
          outlets.menu = menus.filter((x) => x.restaurant == outlets.id);
        });
        return outlets;
      })
    );
  }

  /**
   * get outlet via id
   * @param outlet
   * @returns
   */

  loadPartnerOutlet(): Observable<IOutlet> {
    return this.http.get<IOutlet>(this.url + '/me').pipe(
      catchError(this.errorHandler),
      map((response: any) => {
        let outlets = response;
        this.menuService.getMenusByOutlet(outlets.id).subscribe((menus) => {
          outlets.menu = menus.filter((x) => x.restaurant == outlets.id);
        });
        return outlets;
      })
    );
  }

  /**
   * Add outlets
   * @param error
   * @returns
   */

  addOutlet(outlet: IOutlet) {
    const formdata = new FormData();
    formdata.append('name', outlet.name);
    formdata.append('slug', outlet.name.replace(/\s+/, '-'));
    formdata.append('mobile', outlet.mobile);
    formdata.append('landline', outlet.landline);
    formdata.append('image', outlet.image);
    formdata.append('owner', JSON.stringify(outlet.owner));
    formdata.append('manager', JSON.stringify(outlet.manager));
    formdata.append('restaurantType', outlet.restaurantType);
    formdata.append('yearOfBirth', outlet.yearOfBirth);
    formdata.append('servingType', outlet.servingType);
    formdata.append('cuisines', JSON.stringify(outlet.cuisines));
    formdata.append('openTime', outlet.openTime);
    formdata.append('closeTime', outlet.closeTime);
    formdata.append('daysOpenInWeek', JSON.stringify(outlet.daysOpenInWeek));
    formdata.append('menuImage', outlet.menuImage);
    formdata.append('costFor', outlet.costFor.toString());
    formdata.append('isOpen', JSON.stringify(outlet.isOpen));
    formdata.append('isClose', JSON.stringify(outlet.isClose));
    formdata.append('address', JSON.stringify(outlet.address));

    return this.http.post(this.url, formdata).pipe(
      catchError(this.errorHandler),
      map((response) => {
        console.log(response);
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
