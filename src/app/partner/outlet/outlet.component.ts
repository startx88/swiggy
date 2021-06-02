import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss'],
})
export class OutletComponent implements OnInit {
  step: number = 1;
  form: FormGroup;
  lat: string;
  lan: string;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // form initialise
    this.form = this.fb.group({
      basic: this.fb.group({
        name: ['', Validators.required],
        image: [File],
        restaurantType: ['veg', Validators.required],
        yearOfBirth: ['', Validators.required],
        mobile: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
            ),
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],
        landline: [''],
        openTime: ['', Validators.required],
        closeTime: ['', Validators.required],
        owner: this.fb.group({
          name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          mobile: [
            '',
            [
              Validators.required,
              Validators.pattern(
                /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
              ),
              Validators.minLength(10),
              Validators.maxLength(10),
            ],
          ],
        }),
      }),
      buisiness: this.fb.group({
        manager: this.fb.group({
          name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          mobile: [
            '',
            [
              Validators.required,
              Validators.pattern(
                /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
              ),
              Validators.minLength(10),
              Validators.maxLength(10),
            ],
          ],
        }),
        cuisines: this.fb.array([], Validators.required),
        daysOpenInWeek: this.fb.array([], Validators.required),
        servingType: ['both'],
        menuImage: [null],
        costFor: [''],
        isOpen: [''],
        isClose: [''],
      }),
      addresses: this.fb.group({
        address: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        landmark: ['', Validators.required],
        pincode: ['', Validators.required],
        location: this.fb.group({
          lat: [this.lat || ''],
          lng: [this.lat || ''],
        }),
      }),
    });
  }

  // checked item selected
  onCheckboxChange(e: { key: string; event: any }) {
    const checkArray: FormArray = this.form
      .get('buisiness')
      .get(e.key) as FormArray;
    if (e.event.target.checked) {
      checkArray.push(new FormControl(e.event.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.event.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  // add outlet
  addOutlet() {
    if (this.form.invalid) return;
    console.log(this.form.value);
  }

  // previout or next
  onPrev() {
    if (this.step > 1) {
      this.step--;
    }
  }
  onNext() {
    if (this.step === 1 && this.form.controls['basic'].invalid) {
      this.form.controls['basic'].markAllAsTouched();
      return;
    }

    if (this.step < 3) {
      this.step++;
    }
  }
}
