import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PartnerComponent } from './partner.component';
import { PartnerRecipeComponent } from './partner-recipe/partner-recipe.component';
import { PartnerOrderComponent } from './partner-order/partner-order.component';
import { PartnerProfileComponent } from './partner-profile/partner-profile.component';
import { PartnerSettingComponent } from './partner-setting/partner-setting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OutletComponent } from './outlet/outlet.component';
import { PartnerRouterModule } from './partner.router.module';
import { WelcomeComponent } from './welcome/welcome.component';

import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './users/users.component';

import { BasicComponent } from './outlet/basic/basic.component';
import { BusinessComponent } from './outlet/business/business.component';
import { AddressComponent } from './outlet/address/address.component';
import { DetailComponent } from './outlet/detail/detail.component';
import { AddMenuComponent } from './outlet/add-menu/add-menu.component';
import { AddCategoryComponent } from './outlet/add-category/add-category.component';

@NgModule({
  declarations: [
    PartnerComponent,
    PartnerRecipeComponent,
    PartnerOrderComponent,
    PartnerProfileComponent,
    PartnerSettingComponent,
    DashboardComponent,
    OutletComponent,
    WelcomeComponent,
    UsersComponent,
    BasicComponent,
    BusinessComponent,
    AddressComponent,
    DetailComponent,
    AddMenuComponent,
    AddCategoryComponent,
  ],
  imports: [CommonModule, SharedModule, PartnerRouterModule],
})
export class PartnerModule {}
