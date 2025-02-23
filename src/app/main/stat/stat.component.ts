import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { interval, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

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
  imports: [FormsModule],
  template: `
    <section class="wrapper stat">
      <label>
        <input type="checkbox" (click)="filter()" /> Exclude my IP
      </label>
      <table class="user-table">
        <thead>
          <tr>
            <th>Country</th>
            <th>City</th>
            <th class="mobile-hide">Provider</th>
            <th>IP Address</th>
            <th class="mobile-hide">Operating System</th>
            <th class="mobile-hide">Browser</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          @for (user of data; track user.dateTime) {
          <tr>
            <td>{{ user.country }}</td>
            <td>{{ user.city }}</td>
            <td class="mobile-hide">{{ user.org }}</td>
            <td>{{ user.ip }}</td>
            <td class="mobile-hide">{{ user.os }}</td>
            <td class="mobile-hide">{{ user.browser }}</td>
            <td>{{ user.dateTime }}</td>
          </tr>
          }
        </tbody>
      </table>
      <div class="arrows">
        <div class="arrows">
          @if (page > 0) {
          <button class="arrow" (click)="previous()"><</button>
          } @if (data.length === 25) {
          <button class="arrow" (click)="next()">></button>
          }
        </div>
        <p class="pagenumber">{{ page }}</p>
      </div>
    </section>
  `,
})
export class StatisticsComponent implements OnDestroy {
  data: UserData[] = [];
  private subscription: Subscription = new Subscription();
  exclude = false;
  ip = '';
  page = 0;

  constructor(private userService: UserService) {
    this.getData();
    const intervalSubscription = interval(10000).subscribe(() => {
      this.getData();
    });

    this.subscription.add(intervalSubscription);

    this.userService.getUserIp().subscribe((ipData) => (this.ip = ipData.ip));
  }

  getData() {
    this.userService
      .getStat(this.exclude, this.ip, this.page)
      .subscribe((data: UserData[]) => {
        this.data = data;
      });
  }

  filter() {
    this.exclude = !this.exclude;
    this.page = 0;
    this.getData();
  }

  previous() {
    this.page = this.page === 0 ? 0 : this.page - 1;
    this.getData();
  }
  next() {
    this.page++;
    this.getData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
