import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: { class: 'root' },
})
export class AppComponent implements OnInit {
  loading: boolean = false;
  visible: boolean = false;
  protected: string[] = ['partner', 'admin', 'auth'];
  constructor(
    private router: Router,
    public alertSrv: AlertService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.autoLogin();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }
      if (event instanceof NavigationEnd) {
        this.loading = false;
      }

      if (event instanceof NavigationStart || event instanceof NavigationEnd) {
        const e = event.url.split('/').filter((x) => x)[0];
        if (
          this.protected.includes(e) ||
          (e && e.toString().includes('auth?returnUrl='))
        ) {
          this.visible = false;
        } else {
          this.visible = true;
        }
      }
    });
  }
}
