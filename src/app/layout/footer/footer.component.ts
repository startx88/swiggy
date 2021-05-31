import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/helper/data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(public data: DataService) {}

  ngOnInit(): void {}
}
