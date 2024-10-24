import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteComponent } from './website.component';

export const adminRoutes: Routes = [
  { path: 'admin/websites', component: WebsiteComponent},
  { path: 'admin/website/:id', component: WebsiteComponent },
  { path: 'admin/website/create', component: WebsiteComponent},
  { path: 'admin/website/update/:id', component: WebsiteComponent},
  { path: 'admin/website/delete/:id', component: WebsiteComponent},
];

export const appRoutes: Routes = [
  { path: 'websites', component: WebsiteComponent},
];
