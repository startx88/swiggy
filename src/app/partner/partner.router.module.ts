import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OutletComponent } from './outlet/outlet.component';
import { PartnerOrderComponent } from './partner-order/partner-order.component';
import { PartnerProfileComponent } from './partner-profile/partner-profile.component';
import { PartnerSettingComponent } from './partner-setting/partner-setting.component';
import { PartnerComponent } from './partner.component';
import { WelcomeComponent } from './welcome/welcome.component';

// partner routes
const partnerRoutes: Routes = [
  {
    path: '',
    component: PartnerComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'outlet', component: OutletComponent },
      { path: 'profile', component: PartnerProfileComponent },
      { path: 'order', component: PartnerOrderComponent },
      { path: 'setting', component: PartnerSettingComponent },
      { path: 'welcome', component: WelcomeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(partnerRoutes)],
  exports: [RouterModule],
})
export class PartnerRouterModule {}
