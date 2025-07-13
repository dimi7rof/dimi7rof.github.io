import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Course, links } from './links.data';
import { ScrollToTopComponent } from '../../containers/scroll-to-top.component/scroll-to-top.component';

@Component({
  selector: 'links-component',
  standalone: true,
  templateUrl: './links.component.html',
  styleUrl: './links.component.css',
  imports: [ScrollToTopComponent],
})
export class LinksComponent {
  courses: Course[] = links;

  constructor(private router: Router) {}

  back() {
    this.router.navigate(['/']);
  }

  get totalLinks(): number {
    return this.courses.reduce((sum, section) => sum + section.links.length, 0);
  }
}
