import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  @Input() url: string = '/';
  @Input() name: string = 'Swiggy';
  @Input() color: string = '#fc8019';
  @Input() size: number = 50;
  constructor() {}

  ngOnInit(): void {}
}
