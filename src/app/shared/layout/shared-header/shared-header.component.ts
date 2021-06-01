import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-shared-header',
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.scss'],
})
export class SharedHeaderComponent implements OnInit {
  @Input() url: string = '/partner';
  user$: Observable<IUser>;
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.auth.user;
  }

  // logout
  onLogout() {
    this.auth.logout();
  }
}
