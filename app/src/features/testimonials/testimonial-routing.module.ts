import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestimonialComponent } from './testimonial.component';

export const adminRoutes: Routes = [
  { path: 'admin/testimonials', component: TestimonialComponent},
  { path: 'admin/testimonial/:id', component: TestimonialComponent},
  { path: 'admin/testimonial/create', component: TestimonialComponent },
  { path: 'admin/testimonial/update/:id', component: TestimonialComponent },
  { path: 'admin/testimonial/delete/:id', component: TestimonialComponent },
];
