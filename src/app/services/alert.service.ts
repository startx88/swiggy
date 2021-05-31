import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAlert } from '../models/alert.model';
import { Color } from '../utility/enums/color.enum ';
import { Size } from '../utility/enums/size.enum';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  visible: boolean = false;
  clearTimer;
  alert = new BehaviorSubject<IAlert>({
    visible: false,
    color: Color.default,
    message: null,
    size: Size.sm,
  });
  constructor() {}

  // open handler
  alertShow(alert: IAlert, timer: number = 3000) {
    this.visible = true;
    this.alert.next(alert);
    this.clearTimer = setTimeout(() => {
      // this.visible = false;
      // this.alert.next(null);
    }, timer);
  }
  // close handler
  alertHide() {
    this.visible = false;
    this.alert.next({ visible: false, color: Color.default, message: '' });
    clearTimeout(this.clearTimer);
    this.clearTimer = null;
  }
  // toggle handler
  alertToggle(alert: IAlert) {
    this.visible = !this.visible;
    this.alert.next(alert);
  }
}
