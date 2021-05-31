import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAlert } from 'src/app/models/alert.model';
import { AlertService } from 'src/app/services/alert.service';
import { Direction } from 'src/app/utility/enums/direction.enu';
import { Size } from 'src/app/utility/enums/size.enum';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  alert: IAlert;
  subscription: Subscription;
  @Input() size: Size;
  @Input() direction: Direction;
  constructor(private alertSrv: AlertService) {}

  ngOnInit(): void {
    this.subscription = this.alertSrv.alert.subscribe((alert: IAlert) => {
      this.alert = alert;
    });
  }

  onClose() {
    this.alertSrv.alertHide();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
