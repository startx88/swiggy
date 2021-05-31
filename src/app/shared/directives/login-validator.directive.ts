import { Directive } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NG_VALIDATORS,
  Validator,
  ValidatorFn,
} from '@angular/forms';

@Directive({
  selector: '[appLoginValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: LoginValidatorDirective,
      multi: true,
    },
  ],
})
export class LoginValidatorDirective implements Validator {
  validator: ValidatorFn;
  constructor() {
    this.validator = this.validation();
  }

  validate(c: AbstractControl) {
    return this.validator(c);
  }

  validation(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value !== null && control.value !== '') {
        const isEmailValid =
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
            control.value
          );
        const isMobileValid =
          /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
            control.value
          );
        if (isEmailValid || isMobileValid) {
          return null;
        } else {
          return {
            validate: { valid: false },
          };
        }
      } else {
        return null;
      }
    };
  }
}
