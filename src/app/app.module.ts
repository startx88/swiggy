import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { ContactComponent } from './views/contact/contact.component';
import { PartnerWithUsComponent } from './views/partner-with-us/partner-with-us.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { PolicyComponent } from './views/policy/policy.component';
import { AppRouterModule } from './app.router.module';

import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthInterceptor } from './helper/auth.interceptor';
import { OutletDetailComponent } from './views/outlet-detail/outlet-detail.component';
import { CartComponent } from './views/cart/cart.component';
import { CheckoutComponent } from './views/checkout/checkout.component';
import { OrderSuccessComponent } from './views/order-success/order-success.component';
import { PaymentComponent } from './views/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    PartnerWithUsComponent,
    NotFoundComponent,
    PolicyComponent,
    HeaderComponent,
    FooterComponent,
    OutletDetailComponent,
    CartComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    PaymentComponent,
  ],
  imports: [BrowserModule, AppRouterModule, SharedModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
