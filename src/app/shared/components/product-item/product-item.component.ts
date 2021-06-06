import { Component, Input, OnInit } from '@angular/core';
import { ICart } from 'src/app/models/cart.mode';
import { IProduct } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: IProduct;
  @Input() isCartBtn: boolean = false;
  @Input() type: boolean = true;
  cart: ICart;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.loadCart();
    this.cartService.cartChange.subscribe((data) => (this.cart = data));
  }

  addToCart() {
    this.cartService.addCartItem(this.product);
  }

  get hasItemInCart() {
    return (
      this.cart && this.cart.items.some((x) => x.product == this.product.id)
    );
  }

  get quantity() {
    return (
      this.cart &&
      this.cart.items.find((x) => x.product == this.product.id).quantity
    );
  }
}
