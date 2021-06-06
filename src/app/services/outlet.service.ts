import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICategory } from '../models/category.model';
import { IOutlet } from '../models/outlet.model';
import { IProduct } from '../models/product.model';
import { CategoryService } from './category.service';
import { MenuService } from './menu.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class OutletService {
  outlets: IOutlet[];
  outlet: IOutlet;
  outletsChange = new Subject<IOutlet[]>();
  outletChange = new Subject<IOutlet>();
  url = environment.apiUrl + '/outlet';
  constructor(
    private http: HttpClient,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  /**********
   * get all outlets
   */
  loadOutlets(): Observable<IOutlet[]> {
    return this.http.get<IOutlet[]>(this.url).pipe(
      catchError(this.errorHandler),
      map((response: any) => {
        let outlets = response;
        for (let i = 0; i < outlets.length; i++) {
          this.categoryService
            .getCategoryByOutlet(outlets[i].id)
            .subscribe((cats) => {
              outlets[i].category = cats.filter(
                (x) => x.restaurant == outlets[i].id
              );
            });
        }
        this.outlets = outlets;
        this.outletsChange.next(this.outlets.slice());
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
        this.categoryService
          .getCategoryByOutlet(outlets.id)
          .subscribe((catResponse) => {
            outlets.category = catResponse
              .filter((x) => x.restaurant == outlets.id)
              .map((cat) => {
                cat.products = [];
                this.productService
                  .getProductsByRestaurant(response.id)
                  .subscribe((products: IProduct[]) => {
                    const p = products.filter((x) => x.category.id === cat.id);
                    cat.products.push(...p);
                  });
                return cat;
              });
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
        let outlet = response;
        this.categoryService
          .getCategoryByOutlet(outlet.id)
          .subscribe((menus) => {
            outlet.category = menus.filter((x) => x.restaurant == outlet.id);
          });
        return outlet;
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
    formdata.append('image', outlet.image);
    formdata.append('email', outlet.email);
    formdata.append('mobile', outlet.mobile);
    formdata.append('website', outlet.website);
    formdata.append('landline', outlet.landline);
    formdata.append('description', outlet.description);
    formdata.append('owner', JSON.stringify(outlet.owner));
    formdata.append('manager', JSON.stringify(outlet.manager));
    formdata.append('restaurantType', outlet.restaurantType);
    formdata.append('yearOfBirth', outlet.yearOfBirth);
    formdata.append('servingType', outlet.servingType);
    formdata.append('cuisines', JSON.stringify(outlet.cuisines));
    formdata.append('daysOpenInWeek', JSON.stringify(outlet.daysOpenInWeek));
    formdata.append('from', outlet.from);
    formdata.append('to', outlet.to);
    formdata.append('openNow', JSON.stringify(outlet.openNow));
    formdata.append('menuImage', outlet.menuImage);
    formdata.append('costFor', outlet.costForTwo.toString());
    formdata.append('isClosed', JSON.stringify(outlet.isClosed));
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
