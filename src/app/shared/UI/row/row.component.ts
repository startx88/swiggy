import { Attribute, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
  host: { class: 'row' },
})
export class RowComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
