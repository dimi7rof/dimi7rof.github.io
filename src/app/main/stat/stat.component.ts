import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'stat-component',
  standalone: true,
  imports: [],
  template: `
    <section class="wrapper stat">
      <header class="inner">
        <p>{{ data }}</p>
      </header>
    </section>
  `,
})
export class StatisticsComponent {
  data = '';
  constructor(private userService: UserService) {
    this.userService.getStat().subscribe((data) => {
      this.data = data;
    });
  }
}
