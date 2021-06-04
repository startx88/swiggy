import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent implements OnInit, OnDestroy {
  restaurantTypes: string[] = ['veg', 'nonveg', 'both'];
  @Input() formGroup: FormGroup;
  @ViewChild('file') file: ElementRef;
  selectedFile: Blob;
  subscription: Subscription;
  constructor(private authSrv: AuthService) {}
  ngOnInit(): void {}

  onSelectFile(key: string, file: File) {
    this.formGroup.patchValue({
      basic: {
        image: file,
      },
    });
  }

  sameAsUser() {
    console.log('hello');
    this.subscription = this.authSrv.user.subscribe((user) => {
      this.formGroup.get('basic').patchValue({
        owner: {
          name: user.firstname + ' ' + user.lastname,
          email: user.email,
          mobile: user.mobile,
        },
      });
    });
  }

  get isFile() {
    const image = this.formGroup.get('basic').get('image');
    if (image) {
      return image;
    }
    return null;
  }
  // validations
  get name() {
    return this.formGroup.get('basic').get('name');
  }
  get image() {
    return this.formGroup.get('basic').get('image');
  }
  get email() {
    return this.formGroup.get('basic').get('email');
  }
  get restaurantType() {
    return this.formGroup.get('basic').get('restaurantType');
  }
  get mobile() {
    return this.formGroup.get('basic').get('mobile');
  }
  get yearOfBirth() {
    return this.formGroup.get('basic').get('yearOfBirth');
  }
  get openTime() {
    return this.formGroup.get('basic').get('openTime');
  }
  get closeTime() {
    return this.formGroup.get('basic').get('closeTime');
  }
  get owenerName() {
    return this.formGroup.get('basic').get('owner').get('name');
  }
  get owenerMobile() {
    return this.formGroup.get('basic').get('owner').get('mobile');
  }
  get owenerEmail() {
    return this.formGroup.get('basic').get('owner').get('email');
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
