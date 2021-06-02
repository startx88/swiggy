import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { IMenu, IOutlet } from 'src/app/models/outlet.model';
import { AlertService } from 'src/app/services/alert.service';
import { MenuService } from 'src/app/services/menu.service';
import { OutletService } from 'src/app/services/outlet.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { onTimeChange } from 'src/app/utility/data';
import { Color } from 'src/app/utility/enums/color.enum ';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss'],
})
export class OutletComponent implements OnInit {
  step: number = 1;
  lat: string;
  lan: string;
  form: FormGroup;
  menuForm: FormGroup;
  outlet: IOutlet;
  @ViewChild(ModalComponent) modal: ModalComponent;
  @ViewChild('modalButton') modalOpenButton: ElementRef;

  constructor(
    private fb: FormBuilder,
    private alert: AlertService,
    private outletService: OutletService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.outletService.loadPartnerOutlet().subscribe((outlet) => {
      this.outlet = outlet;
    });
    this.menuForm = this.fb.group({
      title: ['', Validators.required],
      price: [''],
      offer: [''],
    });
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
        openTime: ['10:30', Validators.required],
        closeTime: ['22:30', Validators.required],
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

  // close modal
  onCloseModal() {
    this.menuForm.reset();
  }

  onEditMenu(menu: IMenu) {
    console.log(menu);
  }

  // add menu
  onAddMenu() {
    if (this.menuForm.invalid) return;
    console.log(this.menuForm.value);
    this.menuService.addMenu(this.outlet.id, this.menuForm.value).subscribe(
      () => {
        this.menuForm.reset();
        this.displayMessage(Color.success, 'Menu added successfully');
      },
      ({ message }) => this.displayMessage(Color.danger, message)
    );
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
    const data = {
      ...this.form.value.basic,
      openTime: onTimeChange(this.form.value.basic.openTime),
      closeTime: onTimeChange(this.form.value.basic.closeTime),
      ...this.form.value.buisiness,
      address: this.form.value.addresses,
    };

    // hit service
    this.outletService.addOutlet(data).subscribe(
      () => {
        this.form.reset();
        this.displayMessage(
          Color.danger,
          'You have successfully added your outlet!'
        );
      },
      ({ message }) => this.displayMessage(Color.danger, message)
    );
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
    if (this.step === 2 && this.form.controls['buisiness'].invalid) {
      this.form.controls['buisiness'].markAllAsTouched();
      return;
    }
    if (this.step === 3 && this.form.controls['addresses'].invalid) {
      this.form.controls['addresses'].markAllAsTouched();
      return;
    }

    if (this.step < 3) {
      this.step++;
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
