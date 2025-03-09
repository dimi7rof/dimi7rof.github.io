import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { interval, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

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
  templateUrl: './visitors.component.html',
  styleUrl: './visitors.component.css',
})
export class VisitorsComponent implements OnDestroy {
  data: UserData[] = [];
  private subscription: Subscription = new Subscription();
  exclude = true;
  ip = '0.0.0.0';
  page = 1;
  pageSize = environment.pageSize;

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
