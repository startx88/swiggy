import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  Validator,
  ValidatorFn,
} from '@angular/forms';

@Directive({
  selector: '[appPincodeVaildator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: PincodeVaildatorDirective,
      multi: true,
    },
  ],
})
export class PincodeVaildatorDirective implements Validator {
  validator: ValidatorFn;
  constructor() {
    this.validator = this.validation();
  }

  validate(control: AbstractControl) {
    return this.validator(control);
  }

  validation() {
    return (control: AbstractControl) => {
      if (control.value !== null && control.value !== '') {
        const isValid = /(^\d{6}$)/.test(control.value);
        if (isValid) {
          return null;
        } else {
          return {
            validate: { invalid: true },
          };
        }
      } else {
        return null;
      }
    };
  }
}
