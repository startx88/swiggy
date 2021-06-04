import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, pipe, Subject, throwError } from 'rxjs';
import { IAlert } from '../models/alert.model';
import { IProduct } from '../models/product.model';
import { Color } from '../utility/enums/color.enum ';
import { Size } from '../utility/enums/size.enum';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: IProduct[] = [];
  productsChange = new Subject<IProduct[]>();
  url = environment.apiUrl + '/product';
  constructor(private http: HttpClient) {}

  /*****
   * get all products
   *
   */
  getProducts() {
    return this.http.get(this.url).pipe(
      catchError(this.errorHandler),
      tap((response: IProduct[]) => {
        this.products = response;
        this.productsChange.next(this.products.slice());
      })
    );
  }

  /*****
   * get all products by restaurant
   *
   */
  getProductsByRestaurant(restaurantId: string) {
    return this.http.get(this.url + '/' + restaurantId).pipe(
      catchError(this.errorHandler),
      tap((response: IProduct[]) => {
        this.products = response;
        this.productsChange.next(this.products.slice());
      })
    );
  }

  /**********
   * Add / Update product
   */
  addUpdateItem(
    restaurantId: string,
    product: IProduct,
    productId?: string,
    status?: string
  ) {
    const formdata = new FormData();
    formdata.append('category', product.category);
    formdata.append('cuisine', product.cuisine);
    formdata.append('title', product.title);
    formdata.append('recipeType', product.recipeType);
    formdata.append('cuisineType', product.cuisineType);
    formdata.append('image', product.image);
    formdata.append('price', product.price.toString());
    formdata.append('offer', product.offer.toString());
    formdata.append('description', product.description);
    if (status === 'UPDATED') {
      return this.http
        .post(this.url + '/' + restaurantId + '/' + productId, formdata)
        .pipe(
          catchError(this.errorHandler),
          tap((response: IProduct) => {
            const index = this.products.findIndex(
              (item) => item.id == productId
            );
            this.products[index] = response;
            this.productsChange.next(this.products.slice());
          })
        );
    } else {
      return this.http.post(this.url + '/' + restaurantId, formdata).pipe(
        catchError(this.errorHandler),
        tap((response: IProduct) => {
          this.products.push(response);
          this.productsChange.next(this.products.slice());
        })
      );
    }
  }

  /*****
   * delete product
   */
  deleteItem(restaurantId: string, productId: string) {
    return this.http
      .delete(this.url + '/' + restaurantId + '/delete' + productId)
      .pipe(
        catchError(this.errorHandler),
        tap(() => {
          const index = this.products.findIndex((x) => x.id === productId);
          this.products.splice(index, 1);
          this.productsChange.next(this.products.slice());
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
