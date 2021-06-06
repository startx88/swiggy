import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICart } from '../models/cart.mode';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: ICart = null;
  cartChange = new Subject<ICart>();
  constructor() {
    const data = JSON.parse(localStorage.getItem('cart'));
    if (data) this.cart = data;
  }

  /**
   * Load cart items
   * @returns
   */
  loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    this.cartChange.next(cart);
    return cart;
  }

  // add cart item
  addCartItem(product: IProduct): void {
    const existItem = this.cart.items.find((x) => x.product == product.id);
    if (existItem) {
      this.cart.items.map((x) =>
        x.product == product.id ? { ...x, quantity: x.quantity + 1 } : x
      );
    } else {
      console.log('hi', this.cart, product);

      this.cart.items.push({
        name: product.title,
        image: product.image,
        price: product.price,
        product: product.id,
        quantity: 1,
      });
    }
    this.cart.total =
      this.cart.total +
      this.cart.items.reduce((x, y) => y.quantity * y.price, 0);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartChange.next(JSON.parse(localStorage.getItem('cart')));
  }

  get cartCount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    this.cartChange.next(cart);
    return cart && cart.items.length;
  }
}
