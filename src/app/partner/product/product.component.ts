import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ICuisine } from 'src/app/models/cuisine.model';
import { IOutlet } from 'src/app/models/outlet.model';
import { ICategory } from '../../models/category.model';
import { IProduct } from 'src/app/models/product.model';
import { AlertService } from 'src/app/services/alert.service';
import { CuisineService } from 'src/app/services/cuisine.service';
import { OutletService } from 'src/app/services/outlet.service';
import { ProductService } from 'src/app/services/product.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Color } from 'src/app/utility/enums/color.enum ';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products$: Observable<IProduct[]>;
  productForm: FormGroup;
  isProductEdit: boolean = false;
  productType: string[] = ['veg', 'nonveg'];
  @ViewChild(ModalComponent) modal: ModalComponent;
  @ViewChild('modalButton') modalOpenButton: ElementRef;
  outlets: IOutlet;
  outletSubscription: Subscription;
  cuisines$: Observable<ICuisine[]>;

  constructor(
    private productService: ProductService,
    private outletService: OutletService,
    private fb: FormBuilder,
    private cuisineService: CuisineService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.cuisines$ = this.cuisineService.getCuisines();

    this.outletSubscription = this.outletService
      .loadPartnerOutlet()
      .subscribe((data) => {
        this.outlets = data;
        this.products$ = this.productService.getProductsByRestaurant(data.id);
      });

    this.productForm = this.fb.group({
      title: ['', Validators.required],
      image: [File, Validators.required],
      category: [null, Validators.required],
      recipeType: ['veg', Validators.required],
      cuisineType: ['', Validators.required],
      price: ['', Validators.required],
      offer: [''],
      description: [''],
    });
  }

  onCloseModal() {
    this.productForm.reset();
  }

  onUpload(file: File) {
    this.productForm.patchValue({
      image: file,
    });
  }

  // add product
  onAddProduct() {
    this.productForm.markAllAsTouched();
    if (this.productForm.invalid) return;
    console.log(this.productForm.value);
    if (this.isProductEdit) {
    } else {
      this.productService
        .addUpdateItem(this.outlets.id, this.productForm.value)
        .subscribe(
          (response) => {
            this.modal.hide();
            this.productForm.reset();
            this.displayMessage(Color.success, 'Product added successfully');
          },
          ({ message }) => this.displayMessage(Color.danger, message)
        );
    }
  }

  // validation
  get cat() {
    return this.productForm.get('category');
  }
  get title() {
    return this.productForm.get('title');
  }
  get price() {
    return this.productForm.get('price');
  }
  get cuisineType() {
    return this.productForm.get('cuisineType');
  }
  get recipeType() {
    return this.productForm.get('recipeType');
  }

  // error message
  displayMessage(color: Color, message: string) {
    this.alert.alertShow({
      color: color,
      message: message,
      visible: true,
    });
  }
}
