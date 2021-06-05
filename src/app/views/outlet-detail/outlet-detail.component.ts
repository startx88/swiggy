import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
  restaurant$: Observable<IOutlet>;
  products: any;
  category: ICategory[];
  isActive: boolean;
  fragment: string;
  constructor(
    private route: ActivatedRoute,
    private outletService: OutletService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.restaurant$ = this.outletService.geOutletById(id);
    this.route.fragment.subscribe((fragment) => {
      console.log(fragment);
      this.fragment = fragment;
    });
  }

  isSectionActive(section: string): boolean {
    let element = false;
    this.route.fragment.subscribe((fragment: string) => {
      element = fragment === section.split('#').pop();
    });
    return element;
  }
}
