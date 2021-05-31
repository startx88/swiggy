import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
import { OutletsComponent } from './outlets/outlets.component';
import { RecipesComponent } from './recipes/recipes.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { CuisinesComponent } from './cuisines/cuisines.component';
import { AdminRouterModule } from './admin.router.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    ProfileComponent,
    SettingComponent,
    OrdersComponent,
    UsersComponent,
    OutletsComponent,
    RecipesComponent,
    CategoriesComponent,
    SubCategoriesComponent,
    CuisinesComponent,
  ],
  imports: [CommonModule, SharedModule, AdminRouterModule],
})
export class AdminModule {}
