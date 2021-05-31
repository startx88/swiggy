import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/helper/data.service';
import { AlertService } from 'src/app/services/alert.service';
import { Color } from 'src/app/utility/enums/color.enum ';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isSubmit = false;
  constructor(public AppContent: DataService, private alert: AlertService) {}

  ngOnInit(): void {}

  onLogin(fomr: NgForm) {
    this.alert.alertShow({
      color: Color.danger,
      message:
        'Something went wrong Something went wrong Something went wrong Something went wrong Something went wrong Something went wrong ',
      visible: true,
    });
  }
}
