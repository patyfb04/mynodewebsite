import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

export const adminRoutes: Routes = [
  { path: 'admin/users', component: UserComponent},
  { path: 'admin/user/:id', component: UserComponent},
  { path: 'admin/user/create', component: UserComponent },
  { path: 'admin/user/update/:id', component: UserComponent },
  { path: 'admin/user/delete/:id', component: UserComponent },
];
