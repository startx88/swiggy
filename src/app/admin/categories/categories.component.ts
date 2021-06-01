import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  constructor() {}

  ngOnInit(): void {}

  // add / update category
  addCategory() {
    if (this.form.invalid) return;
    console.log('submited', this.form.value);
  }

  // modal close
  onModalClose() {
    this.form.reset();
  }
}
