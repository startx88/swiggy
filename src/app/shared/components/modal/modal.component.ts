import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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

  @ViewChild('close') closeModal: ElementRef;
  constructor() {}

  ngOnInit(): void {}

  onCloseModal() {
    this.close.emit();
  }

  hide() {
    this.closeModal.nativeElement.click();
  }
}
