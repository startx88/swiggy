import { Directive } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  NG_VALIDATORS,
  Validator,
  ValidatorFn,
} from '@angular/forms';

@Directive({
  selector: '[appConfirmPassword]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: ConfirmPasswordDirective,
      multi: true,
    },
  ],
})
export class ConfirmPasswordDirective implements Validator {
  validator: ValidatorFn;
  constructor() {
    this.validator = this.confirmPasswordValidator();
  }

  validate(c: FormGroup) {
    return this.validator(c);
  }

  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      console.log(control);
      return control;
    };
  }
}
