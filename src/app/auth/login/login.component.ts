import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/helper/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isSubmit = false;
  constructor(public AppContent: DataService) {}

  ngOnInit(): void {}

  onLogin(fomr: NgForm) {}
}
