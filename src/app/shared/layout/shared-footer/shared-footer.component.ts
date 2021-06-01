import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/helper/data.service';

@Component({
  selector: 'app-shared-footer',
  templateUrl: './shared-footer.component.html',
  styleUrls: ['./shared-footer.component.scss'],
})
export class SharedFooterComponent implements OnInit {
  constructor(public data: DataService) {}

  ngOnInit(): void {}
}
