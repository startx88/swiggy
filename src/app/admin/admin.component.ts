import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../helper/data.service';

@Component({
  selector: 'app-admin',
  template: `<div class="wrapper">
    <app-shared-sidebar
      [url]="'/admin'"
      [menus]="content.adminMenu"
    ></app-shared-sidebar>
    <div class="wrapper-container">
      <app-shared-header [url]="'/admin'"></app-shared-header>
      <div class="wrapper-content">
        <router-outlet></router-outlet>
      </div>
      <app-shared-footer></app-shared-footer>
    </div>
  </div>`,
  styles: [],
  host: { class: 'app-admin flex' },
})
export class AdminComponent implements OnInit {
  constructor(public content: DataService) {}
  ngOnInit(): void {}
}
