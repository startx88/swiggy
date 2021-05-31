import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partner',
  template: ` <div class="wrapper">
    <app-sidebar *ngIf="router.url !== '/vendor/welcome'"></app-sidebar>
    <div class="wrapper-container">
      <app-header *ngIf="router.url !== '/vendor/welcome'"></app-header>
      <div class="wrapper-content">
        <router-outlet></router-outlet>
      </div>
      <app-vendor-footer
        *ngIf="router.url !== '/vendor/welcome'"
      ></app-vendor-footer>
    </div>
  </div>`,
  styles: [],
  host: { class: 'app-vendor flex' },
})
export class PartnerComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}
}
