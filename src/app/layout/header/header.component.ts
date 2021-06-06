import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICart } from 'src/app/models/cart.mode';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cart: ICart;
  count: number;
  @Input() url: string;
  subscription: Subscription;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.loadCart();
    this.count = this.cartService.cartCount;
    this.cartService.cartChange.subscribe((data) => (this.cart = data));
  }
}
