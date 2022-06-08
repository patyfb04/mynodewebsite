import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {AdminViewComponent } from './adminView.component'
import {AppViewComponent } from './appView.component'
import { UserComponent } from './../features/users/user.component';
import { ClientComponent } from './../features/clients/client.component';
import { BookComponent } from './../features/books/book.component';
import { BookPaymentBalanceComponent } from './../features/bookPaymentBalance/bookPaymentBalance.component';

import { AppService } from './app.service';
import { UserService } from './../features/users/user.service';
import { ClientService } from './../features/clients/client.service';
import { BookService } from './../features/books/book.service';
import { BookPaymentBalanceService } from './../features/bookPaymentBalance/bookPaymentBalance.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminViewComponent,
    AppViewComponent,
    UserComponent,
    ClientComponent,
    BookComponent,
    BookPaymentBalanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AppService, UserService, ClientService, BookService,BookPaymentBalanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
