import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { interval, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
      @if (data.length !== 0) {
      <label>
        <input type="checkbox" (click)="filter()" /> Exclude this device
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
          @if (page > 1) {
          <button class="arrow" (click)="previous()"><</button>
          }@if (page <= 1) {
          <div class="arrow"></div>
          } @if (data.length === 20) {
          <button class="arrow" (click)="next()">></button>
          }
        </div>
        <p class="pagenumber">{{ page }}</p>
      </div>
      } @if (data.length === 0) {
      <div class="spinner-container">
        <div class="spinner"></div>
      </div>
      }
    </section>
    <section class="wrapper back">
      <button class="back-btn" (click)="back()">Back</button>
    </section>
  `,
})
export class StatisticsComponent implements OnDestroy {
  data: UserData[] = [];
  private subscription: Subscription = new Subscription();
  exclude = false;
  ip = '0.0.0.0';
  page = 1;

  constructor(private userService: UserService, private router: Router) {
    this.getData();
    const intervalSubscription = interval(60000).subscribe(() => {
      this.getData();
    });

    this.subscription.add(intervalSubscription);
    this.userService.getUserIp().subscribe((ipData) => (this.ip = ipData.ip));
  }

  getData() {
    this.userService
      .getAll(this.exclude, this.ip, this.page - 1)
      .subscribe((data: UserData[]) => {
        this.data = data;
      });
  }

  filter() {
    this.exclude = !this.exclude;
    this.page = 1;
    this.getData();
  }

  previous() {
    this.page--;
    this.getData();
  }

  next() {
    this.page++;
    this.getData();
  }

  back() {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
