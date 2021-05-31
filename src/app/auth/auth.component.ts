import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  template: ` <router-outlet></router-outlet> `,
  styles: [],
  host: { class: 'auth-root' },
})
export class AuthComponent implements OnInit {
  returnUrl: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authSrv: AuthService
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (this.authSrv.isAuthenticate) {
      this.router.navigate([this.returnUrl]);
    }
  }
}
