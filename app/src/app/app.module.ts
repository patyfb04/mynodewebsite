import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule, TINYMCE_SCRIPT_SRC  } from '@tinymce/tinymce-angular';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
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
import { ArtistComponent } from '../features/artist/artist.component';
import { TestimonialComponent } from './../features/testimonials/testimonial.component';
import { FormInfoComponent } from './../features/formInfo/formInfo.component';
import { DashboardComponent } from './../features/dashboard/dashboard.component';
import { HomeComponent } from './../features/home/home.component';
import { VideoComponent } from './../features/video/video.component';

import { AppService } from './app.service';
import { UserService } from './../features/users/user.service';
import { ClientService } from './../features/clients/client.service';
import { BookService } from './../features/books/book.service';
import { BookPaymentBalanceService } from './../features/bookPaymentBalance/bookPaymentBalance.service';
import { BookDeliverableService } from './../features/bookDeliverables/bookDeliverable.service';
import { ArtworkService } from './../features/artworks/artwork.service';
import { ServiceService } from './../features/service/service.service';
import { ArtistService } from '../features/artist/artist.service';
import { TestimonialService } from './../features/testimonials/testimonial.service';
import { FormInfoService } from './../features/formInfo/formInfo.service';
import { HomeService } from './../features/home/home.service';
import { VideoService } from './../features/video/video.service';

import { ArtworFilterPipe } from '../features/artworks/pipes/filter-array';
import { SafePipe } from '../common/pipes/safe-pipe';
import {EncrDecrService} from '../common/services/encr-decr.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalStorageService } from 'src/common/services/localStorage.service';
import { LoginComponent } from 'src/features/login/login.component';
import { DeferLoadModule } from 'src/common/directives/defer-loading/defer-load.module';
import { CarouselModule } from 'src/common/carousel/carousel.module';

@NgModule({
  declarations: [
    AppComponent,
    AdminViewComponent,
    AppViewComponent,
    HomeComponent,
    UserComponent,
    ClientComponent,
    BookComponent,
    BookPaymentBalanceComponent,
    BookDeliverableComponent,
    ArtworkComponent,
    ServiceComponent,
    ArtistComponent,
    TestimonialComponent,
    LoginComponent,
    FormInfoComponent,
    DashboardComponent,
    VideoComponent,
    ArtworFilterPipe,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    EditorModule,
    DeferLoadModule,
    CarouselModule
  ],
  providers: [AppService,
              UserService,
              ClientService,
              BookService,
              BookPaymentBalanceService,
              BookDeliverableService,
              ArtworkService,
              ServiceService,
              ArtistService,
              TestimonialService,
              EncrDecrService,
              FormInfoService,
              HomeService,
              VideoService,
              LocalStorageService,
              { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
              { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
