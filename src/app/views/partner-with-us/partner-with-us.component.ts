import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-partner-with-us',
  templateUrl: './partner-with-us.component.html',
  styleUrls: ['./partner-with-us.component.scss'],
})
export class PartnerWithUsComponent implements OnInit {
  @Input() bg: string;
  formGroup: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // initialize form
    this.formGroup = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      mobile: ['', Validators.required],
    });
  }
}
