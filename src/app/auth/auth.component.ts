import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  template: ` <router-outlet></router-outlet> `,
  styles: [],
  host: { class: 'auth-root' },
})
export class AuthComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
