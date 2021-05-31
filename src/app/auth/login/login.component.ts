import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/helper/data.service';
import { IAuthResponse } from 'src/app/models/auth.model';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { Color } from 'src/app/utility/enums/color.enum ';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isSubmit = false;
  constructor(
    public AppContent: DataService,
    private alert: AlertService,
    private authSrv: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogin(form: NgForm) {
    this.isSubmit = true;
    if (form.invalid) return;
    this.authSrv.login(form.value).subscribe(
      (response: IAuthResponse) => {
        this.isSubmit = false;
      },
      (error) => {
        this.isSubmit = false;
        this.alert.alertShow({
          color: Color.danger,
          message: error.message,
          visible: true,
        });
      }
    );
  }
}
