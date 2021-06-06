import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { ButtonComponent } from './components/button/button.component';
import { ModalComponent } from './components/modal/modal.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { CollapseComponent } from './components/collapse/collapse.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabNavComponent } from './components/tab/tab-nav/tab-nav.component';
import { TabContentComponent } from './components/tab/tab-content/tab-content.component';
import { RowComponent } from './UI/row/row.component';
import { ColComponent } from './UI/col/col.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { LogoComponent } from './logo/logo.component';
import { RouterModule } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { SharedHeaderComponent } from './layout/shared-header/shared-header.component';
import { SharedFooterComponent } from './layout/shared-footer/shared-footer.component';
import { SharedSidebarComponent } from './layout/shared-sidebar/shared-sidebar.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { LoginValidatorDirective } from './directives/login-validator.directive';
import { ImgComponent } from './components/img/img.component';
import { UploadComponent } from './components/upload/upload.component';
import { CardComponent } from './UI/card/card.component';
import { PanelComponent } from './UI/panel/panel.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { TitleComponent } from './components/title/title.component';
import { PincodeVaildatorDirective } from './directives/pincode-vaildator.directive';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ConfirmPasswordDirective } from './directives/confirm-password.directive';

@NgModule({
  declarations: [
    AlertComponent,
    ButtonComponent,
    ModalComponent,
    DropdownComponent,
    CollapseComponent,
    TabsComponent,
    TabNavComponent,
    TabContentComponent,
    RowComponent,
    ColComponent,
    LoaderComponent,
    LogoComponent,
    HeroComponent,
    SharedHeaderComponent,
    SharedFooterComponent,
    SharedSidebarComponent,
    PageTitleComponent,
    CapitalizePipe,
    LoginValidatorDirective,
    ImgComponent,
    UploadComponent,
    CardComponent,
    PanelComponent,
    DataTableComponent,
    TextareaComponent,
    TitleComponent,
    PincodeVaildatorDirective,
    ProductItemComponent,
    ConfirmPasswordDirective,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    AlertComponent,
    ButtonComponent,
    ModalComponent,
    DropdownComponent,
    CollapseComponent,
    TabsComponent,
    TabNavComponent,
    TabContentComponent,
    RowComponent,
    ColComponent,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
    LogoComponent,
    HeroComponent,
    SharedHeaderComponent,
    SharedFooterComponent,
    SharedSidebarComponent,
    PageTitleComponent,
    CapitalizePipe,
    UploadComponent,
    CardComponent,
    PanelComponent,
    DataTableComponent,
    TextareaComponent,
    TitleComponent,
    LoginValidatorDirective,
    PincodeVaildatorDirective,
    ProductItemComponent,
    ConfirmPasswordDirective,
  ],
})
export class SharedModule {}
