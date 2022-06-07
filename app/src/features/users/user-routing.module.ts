import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

export const routes: Routes = [
  { path: 'admin/users', component: UserComponent},
];

