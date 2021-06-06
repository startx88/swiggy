import { Component, OnInit } from '@angular/core';
import { ICart } from 'src/app/models/cart.mode';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  host: { class: 'flex' },
})
export class CartComponent implements OnInit {
  cart: ICart;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.loadCart();
    this.cartService.cartChange.subscribe((data) => (this.cart = data));
  }
}
