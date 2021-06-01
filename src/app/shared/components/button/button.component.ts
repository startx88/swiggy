import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Color } from 'src/app/utility/enums/color.enum ';
import { Size } from 'src/app/utility/enums/size.enum';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() color: Color = Color.primary;
  @Input() size: Size = Size.xs;
  @Input() disabled: boolean = false;
  @Input() iconBtn: boolean = false;
  constructor() {}
  ngOnInit(): void {}
}
