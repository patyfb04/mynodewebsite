import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserComponent } from './../features/users/user.component';
import { ClientComponent } from './../features/clients/client.component';

import { AppService } from './app.service';
import { UserService } from './../features/users/user.service';
import { ClientService } from './../features/clients/client.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AppService, UserService, ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
