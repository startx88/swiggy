import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-partner-with-us',
  templateUrl: './partner-with-us.component.html',
  styleUrls: ['./partner-with-us.component.scss'],
})
export class PartnerWithUsComponent implements OnInit {
  @Input() bg: string;
  form: FormGroup;
  confirmPasswordError: boolean = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // initialize form
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      mobile: ['', Validators.required],
    });

    this.form.valueChanges.subscribe((data) => {
      if (data.password === data.confirmPassword) {
        this.confirmPasswordError = true;
      } else {
        this.confirmPasswordError = false;
      }
    });
  }

  // firstname
  get firstname() {
    return this.form.get('firstname');
  }
  // lastname
  get lastname() {
    return this.form.get('lastname');
  }
  // email
  get email() {
    return this.form.get('email');
  }
  // password
  get password() {
    return this.form.get('password');
  }
  // password
  get confirm() {
    return this.form.get('confirmPassword');
  }
  // mobile
  get mobile() {
    return this.form.get('mobile');
  }
  noPartnerRegistration() {
    if (this.form.invalid) return;
  }
}
