import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {AdminViewComponent } from './adminView.component'
import {AppViewComponent } from './appView.component'
import { UserComponent } from './../features/users/user.component';
import { ClientComponent } from './../features/clients/client.component';
import { BookComponent } from './../features/books/book.component';
import { BookPaymentBalanceComponent } from './../features/bookPaymentBalance/bookPaymentBalance.component';
import { BookDeliverableComponent } from './../features/bookDeliverables/bookDeliverable.component';
import { ArtworkComponent } from './../features/artworks/artwork.component';
import { ServiceComponent } from './../features/service/service.component';
import { ContactComponent } from './../features/contact/contact.component';
import { TestimonialComponent } from './../features/testimonials/testimonial.component';

import { AppService } from './app.service';
import { UserService } from './../features/users/user.service';
import { ClientService } from './../features/clients/client.service';
import { BookService } from './../features/books/book.service';
import { BookPaymentBalanceService } from './../features/bookPaymentBalance/bookPaymentBalance.service';
import { BookDeliverableService } from './../features/bookDeliverables/bookDeliverable.service';
import { ArtworkService } from './../features/artworks/artwork.service';
import { ServiceService } from './../features/service/service.service';
import { ContactService } from './../features/contact/contact.service';
import { TestimonialService } from './../features/testimonials/testimonial.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AdminViewComponent,
    AppViewComponent,
    UserComponent,
    ClientComponent,
    BookComponent,
    BookPaymentBalanceComponent,
    BookDeliverableComponent,
    ArtworkComponent,
    ServiceComponent,
    ContactComponent,
    TestimonialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  providers: [AppService, 
              UserService, 
              ClientService, 
              BookService,
              BookPaymentBalanceService,
              BookDeliverableService,
              ArtworkService,
              ServiceService,
              ContactService,
              TestimonialService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
