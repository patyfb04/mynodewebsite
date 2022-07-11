import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtworkComponent } from './artwork.component';

export const adminRoutes: Routes = [
  { path: 'admin/artworks', component: ArtworkComponent},
  { path: 'admin/artwork/:id', component: ArtworkComponent },
  { path: 'admin/artwork/create', component: ArtworkComponent},
  { path: 'admin/artwork/update/:id', component: ArtworkComponent},
  { path: 'admin/artwork/delete/:id', component: ArtworkComponent},
];

export const appRoutes: Routes = [
  { path: 'artworks', component: ArtworkComponent},
];
