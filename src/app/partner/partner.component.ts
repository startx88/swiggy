import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partner',
  template: ` <div class="wrapper">
    <app-shared-sidebar
      *ngIf="router.url !== '/vendor/welcome'"
    ></app-shared-sidebar>
    <div class="wrapper-container">
      <app-shared-header
        *ngIf="router.url !== '/vendor/welcome'"
      ></app-shared-header>
      <div class="wrapper-content">
        <router-outlet></router-outlet>
      </div>
      <app-shared-footer
        *ngIf="router.url !== '/vendor/welcome'"
      ></app-shared-footer>
    </div>
  </div>`,
  styles: [],
  host: { class: 'app-vendor flex' },
})
export class PartnerComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}
}
