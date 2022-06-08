import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewComponent } from './adminView.component';
import { AppViewComponent } from './appView.component';
import { adminRoutes as userRoutes } from '../features/users/user-routing.module';
import { adminRoutes as clientAdminRoutes, appRoutes as clientAppRoutes } from '../features/clients/client-routing.module'

const routes: Routes = [
  { 
    path: '',  component: AppViewComponent, },
  { path: 'admin',  component: AdminViewComponent,},
  ...userRoutes,
  ...clientAppRoutes,
  ...clientAdminRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
