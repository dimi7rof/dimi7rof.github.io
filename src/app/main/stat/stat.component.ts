import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { interval } from 'rxjs';

interface UserData {
  ip: string;
  os: string;
  browser: string;
  dateTime: string;
}

@Component({
  selector: 'stat-component',
  standalone: true,
  imports: [],
  template: `
    <section class="wrapper stat">
      <table class="user-table">
        <thead>
          <tr>
            <th>IP Address</th>
            <th>Operating System</th>
            <th>Browser</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          @for (user of data; track user.dateTime) {
          <tr>
            <td>{{ user.ip }}</td>
            <td>{{ user.os }}</td>
            <td>{{ user.browser }}</td>
            <td>{{ user.dateTime }}</td>
          </tr>
          }
        </tbody>
      </table>
    </section>
  `,
})
export class StatisticsComponent {
  data: UserData[] = [];
  constructor(private userService: UserService) {
    interval(5000).subscribe(() =>
      this.userService.getStat().subscribe((data: UserData[]) => {
        this.data = data;
      })
    );
  }
}
