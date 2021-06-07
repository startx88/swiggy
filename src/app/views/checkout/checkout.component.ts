import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  form: FormGroup;
  sameAs: boolean = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      shopping: this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mobile: [
          '',
          Validators.required,
          Validators.pattern(
            /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
          ),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
        addAddress: this.fb.group({
          address: ['', Validators.required],
          state: ['', Validators.required],
          city: ['', Validators.required],
          pincode: [
            '',
            [
              Validators.required,
              Validators.pattern(/(^\d{6}$)/),
              Validators.minLength(6),
              Validators.maxLength(6),
            ],
          ],
          landmark: ['', Validators.required],
        }),
      }),
      billing: this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mobile: [
          '',
          Validators.required,
          Validators.pattern(
            /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
          ),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
        addAddress: this.fb.group({
          address: ['', Validators.required],
          state: ['', Validators.required],
          city: ['', Validators.required],
          pincode: [
            '',
            [
              Validators.required,
              Validators.pattern(/(^\d{6}$)/),
              Validators.minLength(6),
              Validators.maxLength(6),
            ],
          ],
          landmark: ['', Validators.required],
        }),
      }),
    });
  }

  onChange(event) {
    this.sameAs = event.target.checked;
    if (this.sameAs) {
      console.log(this.form.get('shopping'));
      this.form.get('billing').patchValue({
        firstname: this.form.controls['shopping'].value.firstname,
        lastname: this.form.controls['shopping'].value.lastname,
        email: this.form.controls['shopping'].value.email,
        mobile: this.form.controls['shopping'].value.mobile,
        addAddress: {
          address: this.form.controls['shopping'].value.addAddress.address,
          state: this.form.controls['shopping'].value.addAddress.state,
          city: this.form.controls['shopping'].value.addAddress.city,
          pincode: this.form.controls['shopping'].value.addAddress.pincode,
          landmark: this.form.controls['shopping'].value.addAddress.landmark,
        },
      });
    } else {
      this.form.get('billing').reset();
    }
  }

  // checkout submitted
  onCheckoutSubmit() {
    this.form.get('shopping').markAllAsTouched();
    if (this.form.invalid) return;
  }

  // validations

  get fname() {
    return this.form.controls['shopping'].get('firstname');
  }
  get lname() {
    return this.form.controls['shopping'].get('lastname');
  }
  get email() {
    return this.form.controls['shopping'].get('email');
  }
  get mobile() {
    return this.form.controls['shopping'].get('mobile');
  }
  get address() {
    return this.form.controls['shopping'].get('addAddress').get('address');
  }
  get state() {
    return this.form.controls['shopping'].get('addAddress').get('state');
  }
  get city() {
    return this.form.controls['shopping'].get('addAddress').get('city');
  }
  get pincode() {
    return this.form.controls['shopping'].get('addAddress').get('pincode');
  }
  get landmark() {
    return this.form.controls['shopping'].get('addAddress').get('landmark');
  }
}
