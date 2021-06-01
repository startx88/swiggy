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
  @Input() data: any[];
  @Input() hideColumns: string[] = ['createdAt', 'updatedAt', 'id'];
  @Input() isAction: boolean = true;
  @Input() limit: number = 5;
  @Output() onActivate = new EventEmitter<string>();
  @Output() onDeactivate = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<string>();
  @Output() onEdit = new EventEmitter<{ item: any }>();
  page: number = 1;
  totalPage: number;
  constructor() {}

  ngOnInit(): void {
    this.totalPage = Math.ceil(this.data.length / this.limit);
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
