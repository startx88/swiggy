import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IMenu, IOutlet } from 'src/app/models/outlet.model';
import { OutletService } from 'src/app/services/outlet.service';

@Component({
  selector: 'app-outlet-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  outlet$: Observable<IOutlet>;
  @Output() editMenu = new EventEmitter<IMenu>();
  constructor(private outletService: OutletService) {}

  ngOnInit(): void {
    // load outlet
    this.outlet$ = this.outletService.loadPartnerOutlet();
  }

  // edit menu
  onEditMenu(menu: IMenu) {
    this.editMenu.emit(menu);
  }
}
