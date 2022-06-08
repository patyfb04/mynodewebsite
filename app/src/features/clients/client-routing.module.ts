import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';

export const adminRoutes: Routes = [
  { path: 'admin/clients', component: ClientComponent},
  { path: 'admin/client/:id', component: ClientComponent },
  { path: 'admin/client/create', component: ClientComponent},
  { path: 'admin/client/update/:id', component: ClientComponent},
  { path: 'admin/client/delete/:id', component: ClientComponent},
];

export const appRoutes: Routes = [
  { path: 'clients', component: ClientComponent},
  { path: 'client/:id', component: ClientComponent}
];
