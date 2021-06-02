import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IOutlet } from 'src/app/models/outlet.model';
import { OutletService } from 'src/app/services/outlet.service';

@Component({
  selector: 'app-outlet-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  outlet$: Observable<IOutlet>;
  constructor(private outletService: OutletService) {}

  ngOnInit(): void {
    // load outlet
    this.outlet$ = this.outletService.loadPartnerOutlet();
  }
}
