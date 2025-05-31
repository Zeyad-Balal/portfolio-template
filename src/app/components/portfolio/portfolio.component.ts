import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 100,
    navText: ['', ''],
    autoplay: true, // Enable autoplay
    autoplayTimeout: 1000, 
    // autoplayHoverPause: true, // Pause on hover
    // autoplaySpeed: 1000, // Transition speed
    smartSpeed: 500, // Smart speed for smooth transitions
    fluidSpeed: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };
}
