import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookPaymentBalanceComponent } from './bookPaymentBalance.component';

export const adminRoutes: Routes = [
  { path: 'admin/bookPaymentBalances', component: BookPaymentBalanceComponent},
  { path: 'admin/bookPaymentBalance/:id', component: BookPaymentBalanceComponent },
  { path: 'admin/bookPaymentBalance/create', component: BookPaymentBalanceComponent},
  { path: 'admin/bookPaymentBalance/update/:id', component: BookPaymentBalanceComponent},
  { path: 'admin/bookPaymentBalance/delete/:id', component: BookPaymentBalanceComponent},
];

export const appRoutes: Routes = [
  { path: 'bookPaymentBalances', component: BookPaymentBalanceComponent},
  { path: 'bookPaymentBalance/:id', component: BookPaymentBalanceComponent}
];
