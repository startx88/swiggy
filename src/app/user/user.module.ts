import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserOrderComponent } from './user-order/user-order.component';
import { UserSettingComponent } from './user-setting/user-setting.component';
import { RouterModule, Routes } from '@angular/router';

// user routes
const userRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', component: UserProfileComponent },
      { path: 'order', component: UserOrderComponent },
      { path: 'setting', component: UserSettingComponent },
    ],
  },
];

@NgModule({
  declarations: [
    UserComponent,
    UserProfileComponent,
    UserOrderComponent,
    UserSettingComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(userRoutes)],
})
export class UserModule {}
