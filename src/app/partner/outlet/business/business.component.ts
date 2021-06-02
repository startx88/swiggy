import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ICuisine } from 'src/app/models/cuisine.model';
import { AuthService } from 'src/app/services/auth.service';
import { CuisineService } from 'src/app/services/cuisine.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
})
export class BusinessComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Output() selected = new EventEmitter<{ key: string; event: MouseEvent }>();
  cuisines$: Observable<ICuisine[]>;
  subscription: Subscription;
  servingType: string[] = ['dine-in', 'delivery', 'both'];
  weekDays: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  constructor(
    private cuisineService: CuisineService,
    private authSrv: AuthService
  ) {}

  ngOnInit(): void {
    this.cuisines$ = this.cuisineService.getCuisines();
  }

  onAddValue(key: string, event: MouseEvent): void {
    this.selected.emit({ key, event });
  }

  sameAsUser() {
    this.subscription = this.authSrv.user.subscribe((user) => {
      this.formGroup.get('buisiness').patchValue({
        manager: {
          name: user.firstname + ' ' + user.lastname,
          email: user.email,
          mobile: user.mobile,
        },
      });
    });
  }
  get servingTypes() {
    return this.formGroup.get('buisiness').get('servingType');
  }
  get serveingFood() {
    return this.formGroup.get('buisiness').get('serveingFood');
  }
  get cuisine() {
    return this.formGroup.get('buisiness').get('cuisines');
  }
  get daysOpenInWeek() {
    return this.formGroup.get('buisiness').get('daysOpenInWeek');
  }
  get menuImage() {
    return this.formGroup.get('buisiness').get('menuImage');
  }
  get costFor() {
    return this.formGroup.get('buisiness').get('costFor');
  }
  get isOpen() {
    return this.formGroup.get('buisiness').get('isOpen');
  }
  get isClose() {
    return this.formGroup.get('buisiness').get('isClose');
  }
  get managerName() {
    return this.formGroup.get('buisiness').get('manager').get('name');
  }
  get managerMobile() {
    return this.formGroup.get('buisiness').get('manager').get('mobile');
  }
  get managerEmail() {
    return this.formGroup.get('buisiness').get('manager').get('email');
  }
}
