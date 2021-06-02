import {
  AfterContentInit,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  @Input() label: string = 'Select file';
  @Input() file: File;
  @Input() single: boolean = false;
  @Input() optional: boolean = false;
  @Input() img: string;
  @Input() validator: any;
  @Output() upload = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onChangeHandler(event: any): void {
    const files = event.target.files;
    const reader = new FileReader();
    if (this.single) {
      this.upload.emit(files[0]);
      reader.readAsDataURL(files[0]);
    } else {
      this.upload.emit(files);
      for (let index = 0; index < files.length; index++) {
        reader.readAsDataURL(files[index]);
      }
    }
  }
}
