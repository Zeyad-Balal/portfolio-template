import { Component, OnInit, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

declare const gsap: any;

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
  trailImages = [
    'https://static.tildacdn.com/tild6533-3764-4235-a435-396365353331/Instagram_post_-_21.png',
    'https://static.tildacdn.com/tild6164-3666-4762-b964-646633656632/Rectangle_205.jpg',
    'https://static.tildacdn.com/tild3437-3334-4335-a563-363137313037/_1.jpg',
    'https://static.tildacdn.com/tild6662-3930-4539-b532-663038323134/Rectangle_217.jpg',
    'https://static.tildacdn.com/tild3363-3139-4263-b262-306132633932/Rectangle_219.jpg',
    'https://static.tildacdn.com/tild6264-6237-4637-a632-306133336538/Instagram_story_-_45.jpg'
  ];

  partners = [
    '../../../assets/images/co-operations/fawry_logo.jpg',
    '../../../assets/images/co-operations/maggi_logo.png',
    '../../../assets/images/co-operations/morocoGov.jpg',
    // '../../../assets/images/co-operations/saudi_logo.jpg',
    '../../../assets/images/co-operations/Takka_logo.png',
    '../../../assets/images/co-operations/download - Copy (3).jpg',
    '../../../assets/images/co-operations/logo.jpg',
    '../../../assets/images/co-operations/aloEvaLogo.webp',
    '../../../assets/images/co-operations/mac_logo2.jpg',
  ];

  private mousePos = { x: 0, y: 0 };
  private lastMousePos = { x: 0, y: 0 };
  private cacheMousePos = { x: 0, y: 0 };
  private imgPosition = 0;
  private zIndexVal = 1;
  private threshold = 150;

  private readonly MathUtils = {
    lerp: (a: number, b: number, n: number) => (1 - n) * a + n * b,
    distance: (x1: number, y1: number, x2: number, y2: number) => Math.hypot(x2 - x1, y2 - y1)
  };

  ngOnInit(): void {
    this.render();
    this.muteAllVideos();
  }

  private muteAllVideos(): void {
    const videos = document.getElementsByTagName('video');
    for (let i = 0; i < videos.length; i++) {
      videos[i].muted = true;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mousePos = { 
      x: event.clientX, 
      y: event.clientY 
    };
  }

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  }

  private render(): void {
    const distance = this.MathUtils.distance(
      this.mousePos.x, 
      this.mousePos.y,
      this.lastMousePos.x, 
      this.lastMousePos.y
    );

    // Smooth mouse movement
    this.cacheMousePos.x = this.MathUtils.lerp(
      this.cacheMousePos.x || this.mousePos.x, 
      this.mousePos.x, 
      0.1
    );
    this.cacheMousePos.y = this.MathUtils.lerp(
      this.cacheMousePos.y || this.mousePos.y, 
      this.mousePos.y, 
      0.1
    );

    if (distance > this.threshold) {
      this.showNextImage();
      this.zIndexVal++;
      this.imgPosition = (this.imgPosition + 1) % this.trailImages.length;
      this.lastMousePos = { ...this.mousePos };
    }

    requestAnimationFrame(() => this.render());
  }

  private showNextImage(): void {
    const img = document.querySelectorAll('.content__img')[this.imgPosition] as HTMLElement;
    if (!img) return;

    gsap.killTweensOf(img);
    gsap.timeline()
      .set(img, {
        startAt: { opacity: 0 },
        opacity: 1,
        scale: 1,
        zIndex: this.zIndexVal,
        x: this.cacheMousePos.x - img.offsetWidth / 2,
        y: this.cacheMousePos.y - img.offsetHeight / 2
      })
      .to(img, {
        duration: 0.9,
        ease: 'expo.out',
        x: this.mousePos.x - img.offsetWidth / 2,
        y: this.mousePos.y - img.offsetHeight / 2
      })
      .to(img, {
        duration: 0.5,
        ease: 'power1.out',
        opacity: 0,
        scale: 0.8
      }, 0.4);
  }
}
