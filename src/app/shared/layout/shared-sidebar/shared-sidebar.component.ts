import { Component, Input, OnInit } from '@angular/core';
import { IMenu } from 'src/app/models/menu.modal';

@Component({
  selector: 'app-shared-sidebar',
  templateUrl: './shared-sidebar.component.html',
  styleUrls: ['./shared-sidebar.component.scss'],
})
export class SharedSidebarComponent implements OnInit {
  @Input() menus: IMenu[];
  @Input() url: string = '/partner';
  constructor() {}

  ngOnInit(): void {}
}
