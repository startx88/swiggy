import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ICategory } from 'src/app/models/category.model';
import { IOutlet } from 'src/app/models/outlet.model';
import { CategoryService } from 'src/app/services/category.service';
import { OutletService } from 'src/app/services/outlet.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-outlet-detail',
  templateUrl: './outlet-detail.component.html',
  styleUrls: ['./outlet-detail.component.scss'],
})
export class OutletDetailComponent implements OnInit {
  restaurant: IOutlet;
  products: any;
  category: ICategory[];
  isActive: boolean;
  fragment: string;
  isVeg: string;
  filteredData: IOutlet;
  subscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private outletService: OutletService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.outletService
      .geOutletById(id)
      .subscribe((response) => {
        this.filteredData = this.restaurant = response;
      });
    this.route.fragment.subscribe((fragment) => {
      this.fragment = fragment;
    });

    console.log(this.isVeg);
  }

  isSectionActive(section: string): boolean {
    let element = false;
    this.route.fragment.subscribe((fragment: string) => {
      element = fragment === section.split('#').pop();
    });
    return element;
  }

  ngAfterViewChecked() {
    const products = this.restaurant.category.map((x) => x.products);

    console.log(products);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
