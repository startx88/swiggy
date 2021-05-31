import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerComponent } from './partner.component';
import { PartnerRecipeComponent } from './partner-recipe/partner-recipe.component';
import { PartnerOrderComponent } from './partner-order/partner-order.component';
import { PartnerProfileComponent } from './partner-profile/partner-profile.component';
import { PartnerSettingComponent } from './partner-setting/partner-setting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OutletComponent } from './outlet/outlet.component';
import { PartnerRouterModule } from './partner.router.module';
import { WelcomeComponent } from './welcome/welcome.component';

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
  ],
  imports: [CommonModule, PartnerRouterModule],
})
export class PartnerModule {}
