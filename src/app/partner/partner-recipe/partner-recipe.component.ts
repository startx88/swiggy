import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ICuisine } from 'src/app/models/cuisine.model';
import { IOutlet } from 'src/app/models/outlet.model';
import { IProduct } from 'src/app/models/product.model';
import { CuisineService } from 'src/app/services/cuisine.service';
import { OutletService } from 'src/app/services/outlet.service';
import { ProductService } from 'src/app/services/product.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-partner-recipe',
  templateUrl: './partner-recipe.component.html',
  styleUrls: ['./partner-recipe.component.scss'],
})
export class PartnerRecipeComponent implements OnInit {
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
    private cuisineService: CuisineService
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
      category: ['', Validators.required],
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

  // add product
  onAddCategory() {
    this.productForm.markAllAsTouched();
    if (this.productForm.invalid) return;
    console.log(this.productForm.value);
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
}
