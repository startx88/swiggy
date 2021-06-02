import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { getGeoLocation } from 'src/app/utility';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  @Input() formGroup: FormGroup;
  constructor() {}
  ngOnInit(): void {
    getGeoLocation(({ coords }) => {
      this.formGroup.get('addresses').patchValue({
        location: {
          lat: coords.latitude,
          lng: coords.longitude,
        },
      });
    });
  }

  get add() {
    return this.formGroup.get('addresses').get('address');
  }
  get state() {
    return this.formGroup.get('addresses').get('state');
  }
  get city() {
    return this.formGroup.get('addresses').get('city');
  }
  get landmark() {
    return this.formGroup.get('addresses').get('landmark');
  }
  get pincode() {
    return this.formGroup.get('addresses').get('pincode');
  }
}
