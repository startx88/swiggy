import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-cuisines',
  templateUrl: './cuisines.component.html',
  styleUrls: ['./cuisines.component.scss'],
})
export class CuisinesComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;
  @ViewChild('form') form: NgForm;
  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.form.reset();
  }

  onAddCuisine() {
    console.log(this.form.value);
  }
}
