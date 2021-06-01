import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/auth.model';
import { IMenu } from 'src/app/models/menu.modal';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-shared-sidebar',
  templateUrl: './shared-sidebar.component.html',
  styleUrls: ['./shared-sidebar.component.scss'],
})
export class SharedSidebarComponent implements OnInit {
  @Input() menus: IMenu[];
  @Input() url: string = '/partner';
  user$: Observable<IUser>;
  constructor(private auth: AuthService) {}

  //
  ngOnInit(): void {
    this.user$ = this.auth.user;
  }
}
