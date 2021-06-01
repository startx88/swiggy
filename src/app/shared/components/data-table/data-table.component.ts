import {
  Attribute,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() hideColumns: string[] = ['createdAt', 'updatedAt', 'id'];
  @Input() isAction: boolean = true;
  @Input() limit: number = 5;
  @Output() onActivate = new EventEmitter<string>();
  @Output() onDeactivate = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<string>();
  @Output() onEdit = new EventEmitter<{ item: any }>();

  filteredData: any = [];
  search: string = '';
  page: number = 1;
  totalPage: number;
  colspan: number;
  constructor() {}

  ngOnInit(): void {
    this.filteredData = this.data;
    this.totalPage = this.data && Math.ceil(this.data.length / this.limit);
    this.colspan =
      this.data.length > 0 ? Object.keys(this.data[0]).length + 1 : 0;
  }

  // search handler
  onSearchHandler(event: any) {
    const value = event.target.value.toLowerCase();
    if (value !== '') {
      this.filteredData = this.data.filter((item) => {
        return Object.keys(item).some((key) =>
          item[key].toString().includes(value)
        );
      });
    }
  }

  // track by
  trackById(id: string, item: any) {
    return item.id;
  }
  // handler
  onEditHandler(item: any) {
    this.onEdit.emit(item);
  }
  onActivateHandler(id: string) {
    this.onActivate.emit(id);
  }
  onDectivateHandler(id: string) {
    this.onDeactivate.emit(id);
  }
  onDeleteHandler(id: string) {
    this.onDelete.emit(id);
  }

  onPrev() {
    if (this.page > 0) {
      this.page--;
    }
  }
  onNext() {
    console.log(this.totalPage);
    if (this.page < this.totalPage) {
      this.page++;
    }
  }
}
