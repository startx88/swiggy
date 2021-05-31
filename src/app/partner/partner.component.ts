import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../helper/data.service';

@Component({
  selector: 'app-partner',
  template: ` <div class="wrapper">
    <app-shared-sidebar [menus]="content.partnerMenu"></app-shared-sidebar>
    <div class="wrapper-container">
      <app-shared-header></app-shared-header>
      <div class="wrapper-content">
        <router-outlet></router-outlet>
      </div>
      <app-shared-footer></app-shared-footer>
    </div>
  </div>`,
  styles: [],
  host: { class: 'app-vendor flex' },
})
export class PartnerComponent implements OnInit {
  constructor(public router: Router, public content: DataService) {}

  ngOnInit(): void {}
}
