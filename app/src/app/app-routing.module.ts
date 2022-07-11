import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewComponent } from './adminView.component';
import { AppViewComponent } from './appView.component';
import { ArtworkComponent } from './../features/artworks/artwork.component';

const routes: Routes = [
  {  path: '',  component: AppViewComponent, },
  {  path: 'artworks',  component: ArtworkComponent, },
  {  path: 'admin',  component: AdminViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
