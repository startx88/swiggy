import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Size } from 'src/app/utility/enums/size.enum';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() id: string;
  @Input() size: Size = Size.sm;
  @Output() close = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    console.log(this.id);
  }

  onCloseModal() {
    this.close.emit();
  }
}
