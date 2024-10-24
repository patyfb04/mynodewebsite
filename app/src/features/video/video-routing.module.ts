import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoComponent } from './video.component';

export const adminRoutes: Routes = [
  { path: 'admin/videos', component: VideoComponent},
  { path: 'admin/video/:id', component: VideoComponent },
  { path: 'admin/video/create', component: VideoComponent},
  { path: 'admin/video/update/:id', component: VideoComponent},
  { path: 'admin/video/delete/:id', component: VideoComponent},
];

export const appRoutes: Routes = [
  { path: 'videos', component: VideoComponent},
];
