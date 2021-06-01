import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ICuisine } from 'src/app/models/cuisine.model';
import { AlertService } from 'src/app/services/alert.service';
import { CuisineService } from 'src/app/services/cuisine.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Color } from 'src/app/utility/enums/color.enum ';

@Component({
  selector: 'app-cuisines',
  templateUrl: './cuisines.component.html',
  styleUrls: ['./cuisines.component.scss'],
})
export class CuisinesComponent implements OnInit {
  @ViewChild(ModalComponent) modal: ModalComponent;
  @ViewChild('form') form: NgForm;
  @ViewChild('modalButton') modalOpenButton: ElementRef;
  keys: string[];
  data: ICuisine[];
  isEdit: boolean = false;
  editItem: ICuisine;
  constructor(
    private cuisineService: CuisineService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.cuisineService.getCuisines().subscribe((response) => {
      this.keys = Object.keys(response[0]);
      this.data = response;
    });
  }

  onEditHandler(item: any) {
    this.isEdit = !!item;
    this.editItem = item;
    this.modalOpenButton.nativeElement.click();
    this.form.setValue({
      title: item.title,
    });
    console.log('item', this.form.value);
  }
  onActivateHandler(id: string) {
    console.log('item', id);
  }
  onDeactivateHandler(id: string) {
    console.log('item', id);
  }
  onDeleteHandler(id: string) {
    console.log('item', id);
  }

  // close modal
  onClose() {
    this.form.reset();
  }

  // image uploader
  onUpload(file: File) {
    this.form.value.image = file;
  }

  // add cuisine
  onAddCuisine() {
    if (this.form.invalid) return;

    const data = {
      title: this.form.value.title,
      image: this.form.value.image,
    };
    if (this.isEdit) {
      this.cuisineService
        .addUpdateCuisine(data, this.editItem.id, 'UPDATED')
        .subscribe(
          (response: ICuisine) => {
            this.isEdit = false;
            this.modal.hide();
            this.form.reset();
            this.handler(Color.success, 'Cuisine updated successfully!');
          },
          ({ message }) => this.handler(Color.danger, message)
        );
    } else {
      this.cuisineService.addUpdateCuisine(data).subscribe(
        (response: ICuisine) => {
          this.isEdit = false;
          this.form.reset();
          this.modal.hide();
          this.handler(Color.success, 'Cuisine added successfully!');
        },
        ({ message }) => this.handler(Color.danger, message)
      );
    }
  }

  // error handler
  handler(color: Color, message: string) {
    this.alert.alertShow({
      color: color,
      message: message,
      visible: true,
    });
  }
}
