import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';

@NgModule({
  imports: [CommonModule],
  exports: [CarouselComponent],
  declarations: [CarouselComponent],
})
export class CarouselModule {}
