import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './views/about/about.component';
import { ContactComponent } from './views/contact/contact.component';
import { HomeComponent } from './views/home/home.component';
import { PartnerWithUsComponent } from './views/partner-with-us/partner-with-us.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { PolicyComponent } from './views/policy/policy.component';
import { AuthGuard } from './helper/auth.guard';
import { AdminGuard } from './helper/admin.guard';
import { PartnerGuard } from './helper/partner.guard';
import { OutletDetailComponent } from './views/outlet-detail/outlet-detail.component';
import { CartComponent } from './views/cart/cart.component';
import { CheckoutComponent } from './views/checkout/checkout.component';

// App Routes
const appRoutes: Routes = [
  { path: '', redirectTo: 'restaurant', pathMatch: 'full' },
  { path: 'restaurant', component: HomeComponent },
  { path: 'restaurant/:id', component: OutletDetailComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'privacy-policy', component: PolicyComponent },
  { path: 'partner-with-us', component: PartnerWithUsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'partner',
    canActivate: [AuthGuard, PartnerGuard],
    loadChildren: () =>
      import('./partner/partner.module').then((m) => m.PartnerModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRouterModule {}
