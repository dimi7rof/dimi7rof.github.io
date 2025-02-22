import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { interval, Subscription } from 'rxjs';

interface UserData {
  ip: string;
  os: string;
  browser: string;
  dateTime: string;
  org: string;
  city: string;
  country: string;
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
            <th>Country</th>
            <th>City</th>
            <th>Provider</th>
            <th>IP Address</th>
            <th class="mobile-hide">Operating System</th>
            <th class="mobile-hide">Browser</th>
            <th class="mobile-hide">Date & Time</th>
          </tr>
        </thead>
        <tbody>
          @for (user of data; track user.dateTime) {
          <tr>
            <td>{{ user.country }}</td>
            <td>{{ user.city }}</td>
            <td>{{ user.org }}</td>
            <td>{{ user.ip }}</td>
            <td class="mobile-hide">{{ user.os }}</td>
            <td class="mobile-hide">{{ user.browser }}</td>
            <td class="mobile-hide">{{ user.dateTime }}</td>
          </tr>
          }
        </tbody>
      </table>
    </section>
  `,
})
export class StatisticsComponent implements OnDestroy {
  data: UserData[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private userService: UserService) {
    const intervalSubscription = interval(5000).subscribe(() => {
      this.userService.getStat().subscribe((data: UserData[]) => {
        this.data = data;
      });
    });

    this.subscription.add(intervalSubscription); // Add subscription for cleanup
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Clean up when component is destroyed
  }
}
