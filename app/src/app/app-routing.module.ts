import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewComponent } from './adminView.component';
import { AppViewComponent } from './appView.component';
import { routes as userRoutes } from '../features/users/user-routing.module';
import { routes as clientRoutes } from '../features/clients/client-routing.module'

const routes: Routes = [
  { path: '', component: AppViewComponent},
  { path: 'admin', component: AdminViewComponent},
  ...userRoutes,
  ...clientRoutes
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
