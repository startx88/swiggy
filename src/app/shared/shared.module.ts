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
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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
  ],
})
export class SharedModule {}
