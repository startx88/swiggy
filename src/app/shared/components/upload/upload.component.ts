import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  @Input() label: string = 'Select file';
  @Input() single: boolean = false;
  @Input() optional: boolean = false;
  @Output() upload = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    console.log(this.optional);
  }

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
