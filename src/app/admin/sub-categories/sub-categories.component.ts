import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/models/category.model';
import { ISubCategory } from 'src/app/models/subcategory.model';
import { AlertService } from 'src/app/services/alert.service';
import { CategoryService } from 'src/app/services/category.service';
import { SubCategoryService } from 'src/app/services/sub-category.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Color } from 'src/app/utility/enums/color.enum ';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss'],
})
export class SubCategoriesComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  @ViewChild('category') category: NgModel;
  editItem: ISubCategory;
  imagePath: string;
  isCatSelected: boolean = false;
  isEdit: boolean = false;
  category$: Observable<ICategory[]>;
  subcats$: Observable<ISubCategory[]>;
  defaultCategory: string = 'select';
  selectedImage: File;
  @ViewChild(ModalComponent) modal: ModalComponent;
  @ViewChild('modalButton') modalOpenButton: ElementRef;
  constructor(
    private categoryService: CategoryService,
    private subcatService: SubCategoryService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    // load categories
    this.category$ = this.categoryService.loadCategories();
    // load subategories
    this.subcats$ = this.subcatService.loadData();
  }

  // close modal
  onModalClose() {}

  // upload images
  onUpload(file: File) {
    console.log('file', file);
    this.selectedImage = file;
  }

  onEditHandler(item: any) {
    console.log(item);
    this.isEdit = !!item;
    this.editItem = item;
    this.modalOpenButton.nativeElement.click();
    console.log('item', item);
    this.form.setValue({
      title: item.title,
      description: item.description,
      category: item.category,
    });
    this.imagePath = item.image;
  }
  onActivateHandler(id: string) {
    console.log('item', id);
  }
  onDeactivateHandler(id: string) {
    console.log('item', id);
  }

  // add / update sub-categories
  addSubcategory() {
    if (this.form.invalid) return;
    if (this.category.control.value == 'select') {
      this.isCatSelected = true;
      return;
    }

    const data = {
      title: this.form.value.title,
      image: this.selectedImage || '',
      category: this.form.value.category,
      description: this.form.value.description,
    };

    if (this.isEdit) {
      this.subcatService
        .addUpdateItem(data, this.editItem.id, 'UPDATED')
        .subscribe(
          (response: ISubCategory) => {
            this.isEdit = false;
            this.modal.hide();
            this.form.reset();
            this.displayMessage(
              Color.success,
              'Sub category  updated successfully!'
            );
          },
          ({ message }) => this.displayMessage(Color.danger, message)
        );
    } else {
      this.subcatService.addUpdateItem(data).subscribe(
        (response: ISubCategory) => {
          this.isEdit = false;
          this.form.reset();
          this.modal.hide();
          this.displayMessage(
            Color.success,
            'Sub category added successfully!'
          );
        },
        ({ message }) => this.displayMessage(Color.danger, message)
      );
    }
  }

  // delete category
  onDeleteHandler(id: string) {
    this.subcatService.deleteItem(id).subscribe(
      (data) =>
        this.displayMessage(
          Color.success,
          'Sub category deleted successfully!'
        ),
      ({ message }) => this.displayMessage(Color.danger, message)
    );
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
