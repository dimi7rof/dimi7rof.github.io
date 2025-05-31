import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'links-component',
  standalone: true,
  templateUrl: './links.component.html',
  styleUrl: './links.component.css',
  imports: [],
})
export class LinksComponent {
  constructor(private router: Router) {}

  back() {
    this.router.navigate(['/']);
  }
}
