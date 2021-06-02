import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  host: { class: 'title' },
})
export class TitleComponent implements OnInit {
  @Input() title: string;
  @Input() titleText: string;
  @Input() level: number = 1;
  constructor() {}

  ngOnInit(): void {}
}
