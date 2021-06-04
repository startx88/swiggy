import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ICategory } from 'src/app/models/category.model';
import { IOutlet } from 'src/app/models/outlet.model';
import { AlertService } from 'src/app/services/alert.service';
import { CategoryService } from 'src/app/services/category.service';
import { OutletService } from 'src/app/services/outlet.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Color } from 'src/app/utility/enums/color.enum ';

@Component({
  selector: 'app-outlet-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  category: FormGroup;
  categoryEditItem: ICategory;
  isCategoryEdit: boolean = false;
  outlet: IOutlet;
  subscription: Subscription;
  @ViewChild(ModalComponent) modal: ModalComponent;
  @ViewChild('modalButton') modalOpenButton: ElementRef;
  constructor(
    private alert: AlertService,
    private outletService: OutletService,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // load outlet
    this.subscription = this.outletService
      .loadPartnerOutlet()
      .subscribe((response) => {
        this.outlet = response;
      });

    this.category = this.fb.group({
      title: ['', Validators.required],
      image: [''],
      description: [''],
    });

    // update menus
    this.categoryService.categoryChange.subscribe((response) => {
      this.outlet.category = response.filter(
        (data) => data.restaurant === this.outlet.id
      );
    });
  }

  // close modal
  onCloseModal() {
    this.category.reset();
    this.isCategoryEdit = false;
  }

  // edit menu
  onEditCategory(category: ICategory) {
    this.isCategoryEdit = !!category;
    this.categoryEditItem = category;
    this.modalOpenButton.nativeElement.click();
    this.category.patchValue({
      title: category.title,
      description: category.description,
    });
  }

  // delete menu
  onDeleteCategory(category: ICategory) {
    console.log(category);
    this.categoryService.deleteItem(this.outlet.id, category.id).subscribe(
      () => {
        this.displayMessage(Color.success, 'Category deleted successfully');
      },
      ({ message }) => this.displayMessage(Color.danger, message)
    );
  }

  // add menu
  onAddCategory() {
    if (this.category.invalid) return;
    const data = {
      title: this.category.value.title,
      description: this.category.value.description,
    };

    if (this.isCategoryEdit) {
      this.categoryService
        .addUpdateItem(
          this.outlet.id,
          data,
          this.categoryEditItem.id,
          'UPDATED'
        )
        .subscribe(
          (response) => {
            this.isCategoryEdit = false;
            this.modal.hide();
            this.category.reset();
            this.displayMessage(Color.success, 'Category updated successfully');
          },
          ({ message }) => this.displayMessage(Color.danger, message)
        );
    } else {
      this.categoryService
        .addUpdateItem(this.outlet.id, this.category.value)
        .subscribe(
          () => {
            this.modal.hide();
            this.category.reset();
            this.displayMessage(Color.success, 'Category added successfully');
          },
          ({ message }) => this.displayMessage(Color.danger, message)
        );
    }
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
