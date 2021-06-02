import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IOutlet } from 'src/app/models/outlet.model';
import { OutletService } from 'src/app/services/outlet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: { class: 'flex' },
})
export class HomeComponent implements OnInit {
  outlets$: Observable<IOutlet[]>;
  constructor(private outletService: OutletService) {}

  ngOnInit(): void {
    this.outlets$ = this.outletService.loadOutlets();
  }
}
