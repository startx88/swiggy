import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: IProduct;
  @Input() isCartBtn: boolean = false;
  @Input() type: boolean = true;
  constructor() {}

  ngOnInit(): void {}
}
