import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ICategory } from 'src/app/models/category.model';
import { AlertService } from 'src/app/services/alert.service';
import { CategoryService } from 'src/app/services/category.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Color } from 'src/app/utility/enums/color.enum ';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: ICategory[] = [];
  subscription: Subscription;
  isEdit: boolean = false;
  editItem: ICategory;
  imagePath: string;

  @ViewChild('form') form: NgForm;
  @ViewChild(ModalComponent) modal: ModalComponent;
  @ViewChild('modalButton') modalOpenButton: ElementRef;

  // constructor
  constructor(
    private categoryService: CategoryService,
    private alert: AlertService
  ) {}

  // on init
  ngOnInit(): void {
    this.subscription = this.categoryService
      .loadCategories()
      .subscribe((response) => {
        this.categories = response;
      });
  }

  // upload images
  onUpload(file: File) {
    this.form.value.image = file;
  }

  // modal close
  onModalClose() {
    this.form.reset();
  }
  onEditHandler(item: any) {
    console.log(item);
    this.isEdit = !!item;
    this.editItem = item;
    this.modalOpenButton.nativeElement.click();

    this.form.setValue({
      title: item.title,
      description: item.description,
    });
    this.imagePath = item.image;
  }
  onActivateHandler(id: string) {
    console.log('item', id);
  }
  onDeactivateHandler(id: string) {
    console.log('item', id);
  }

  // add / update category
  addCategory() {
    if (this.form.invalid) return;
    const data = {
      title: this.form.value.title,
      image: this.form.value.image || '',
      description: this.form.value.description,
    };
    if (this.isEdit) {
      this.categoryService
        .addUpdateCategory(data, this.editItem.id, 'UPDATED')
        .subscribe(
          (response: ICategory) => {
            this.isEdit = false;
            this.modal.hide();
            this.form.reset();
            this.displayMessage(
              Color.success,
              'Category updated successfully!'
            );
          },
          ({ message }) => this.displayMessage(Color.danger, message)
        );
    } else {
      this.categoryService.addUpdateCategory(data).subscribe(
        (response: ICategory) => {
          this.isEdit = false;
          this.form.reset();
          this.modal.hide();
          this.displayMessage(Color.success, 'Category added successfully!');
        },
        ({ message }) => this.displayMessage(Color.danger, message)
      );
    }
  }
  // delete category
  onDeleteHandler(id: string) {
    this.categoryService.deleted(id).subscribe(
      (data) =>
        this.displayMessage(Color.success, 'Category deleted successfully!'),
      ({ message }) => this.displayMessage(Color.danger, message)
    );
  }

  // destroy subscription
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // error handler
  displayMessage(color: Color, message: string) {
    this.alert.alertShow({
      color: color,
      message: message,
      visible: true,
    });
  }
}
