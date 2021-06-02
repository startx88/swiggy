import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-outlet-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss'],
  host: { class: 'form-row' },
})
export class AddMenuComponent implements OnInit {
  @Input() formGroup: FormGroup;
  constructor() {}

  ngOnInit(): void {}

  get title() {
    return this.formGroup.get('title');
  }
  get price() {
    return this.formGroup.get('price');
  }
  get offer() {
    return this.formGroup.get('offer');
  }
}
