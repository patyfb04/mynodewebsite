import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDeliverableComponent } from './bookDeliverable.component';

export const adminRoutes: Routes = [
  { path: 'admin/bookDeliverables', component: BookDeliverableComponent},
  { path: 'admin/bookDeliverable/:id', component: BookDeliverableComponent },
  { path: 'admin/bookDeliverable/create', component: BookDeliverableComponent},
  { path: 'admin/bookDeliverable/update/:id', component: BookDeliverableComponent},
  { path: 'admin/bookDeliverable/delete/:id', component: BookDeliverableComponent},
];

export const appRoutes: Routes = [
  { path: 'booka', component: BookDeliverableComponent},
  { path: 'book/:id', component: BookDeliverableComponent}
];
