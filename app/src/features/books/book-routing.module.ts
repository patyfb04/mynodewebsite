import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book.component';

export const adminRoutes: Routes = [
  { path: 'admin/books', component: BookComponent},
  { path: 'admin/book/:id', component: BookComponent },
  { path: 'admin/book/create', component: BookComponent},
  { path: 'admin/book/update/:id', component: BookComponent},
  { path: 'admin/book/delete/:id', component: BookComponent},
];

export const appRoutes: Routes = [
  { path: 'booka', component: BookComponent},
  { path: 'book/:id', component: BookComponent}
];
