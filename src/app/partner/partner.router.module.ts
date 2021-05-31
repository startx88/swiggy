import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OutletComponent } from './outlet/outlet.component';
import { PartnerOrderComponent } from './partner-order/partner-order.component';
import { PartnerProfileComponent } from './partner-profile/partner-profile.component';
import { PartnerRecipeComponent } from './partner-recipe/partner-recipe.component';
import { PartnerSettingComponent } from './partner-setting/partner-setting.component';
import { PartnerComponent } from './partner.component';
import { UsersComponent } from './users/users.component';
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
      { path: 'orders', component: PartnerOrderComponent },
      { path: 'recipes', component: PartnerRecipeComponent },
      { path: 'users', component: UsersComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'profile', component: PartnerProfileComponent },
      { path: 'setting', component: PartnerSettingComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(partnerRoutes)],
  exports: [RouterModule],
})
export class PartnerRouterModule {}
