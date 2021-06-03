import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IMenu, IOutlet } from 'src/app/models/outlet.model';
import { AlertService } from 'src/app/services/alert.service';
import { MenuService } from 'src/app/services/menu.service';
import { OutletService } from 'src/app/services/outlet.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Color } from 'src/app/utility/enums/color.enum ';

@Component({
  selector: 'app-outlet-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  menuForm: FormGroup;
  outlet: IOutlet;
  subscription: Subscription;
  isMenuEdit: boolean = false;
  menuItem: IMenu;
  @ViewChild(ModalComponent) modal: ModalComponent;
  @ViewChild('modalButton') modalOpenButton: ElementRef;
  constructor(
    private alert: AlertService,
    private outletService: OutletService,
    private menuService: MenuService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // load outlet
    this.subscription = this.outletService
      .loadPartnerOutlet()
      .subscribe((response) => {
        this.outlet = response;
      });

    this.menuForm = this.fb.group({
      title: ['', Validators.required],
      price: [''],
      offer: [''],
    });

    // update menus
    this.menuService.menuChange.subscribe((response) => {
      this.outlet.menu = response.filter(
        (data) => data.restaurant === this.outlet.id
      );
    });
  }

  // close modal
  onCloseModal() {
    this.menuForm.reset();
    this.isMenuEdit = false;
  }

  // edit menu
  onEditMenu(menu: IMenu) {
    this.isMenuEdit = !!menu;
    this.menuItem = menu;
    this.modalOpenButton.nativeElement.click();
    this.menuForm.patchValue({
      title: menu.title,
      price: menu.price,
      offer: menu.offer,
    });
  }

  // delete menu
  onDeleeMenu(menu: IMenu) {
    this.menuService.deleteMenu(menu.restaurant, menu.id).subscribe(
      () => {
        this.displayMessage(Color.success, 'Menu deleted successfully');
      },
      ({ message }) => this.displayMessage(Color.danger, message)
    );
  }

  // add menu
  onAddMenu() {
    if (this.menuForm.invalid) return;
    if (this.isMenuEdit) {
      this.menuService
        .updateMenu(this.outlet.id, this.menuItem.id, this.menuForm.value)
        .subscribe(
          (response) => {
            this.isMenuEdit = false;
            this.menuItem = null;
            this.modal.hide();
            this.menuForm.reset();
            this.displayMessage(Color.success, 'Menu updated successfully');
          },
          ({ message }) => this.displayMessage(Color.danger, message)
        );
    } else {
      this.menuService.addMenu(this.outlet.id, this.menuForm.value).subscribe(
        () => {
          this.menuForm.reset();
          this.displayMessage(Color.success, 'Menu added successfully');
        },
        ({ message }) => this.displayMessage(Color.danger, message)
      );
    }
  }

  // error message
  displayMessage(color: Color, message: string) {
    this.alert.alertShow({
      color: color,
      message: message,
      visible: true,
    });
  }
}
