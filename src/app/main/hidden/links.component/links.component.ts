import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Course, links } from './links.data';

@Component({
  selector: 'links-component',
  standalone: true,
  templateUrl: './links.component.html',
  styleUrl: './links.component.css',
  imports: [],
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
