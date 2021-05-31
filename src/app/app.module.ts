import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
  ],
  imports: [BrowserModule, AppRouterModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
