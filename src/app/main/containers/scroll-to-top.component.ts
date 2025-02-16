import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  template: `
    @if (isVisible) {
    <button (click)="scrollToTop()" class="scroll-to-top">⬆</button>
    }
  `,
})
export class ScrollToTopComponent {
  isVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isVisible = window.scrollY > 300; // Show button after scrolling 300px
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
