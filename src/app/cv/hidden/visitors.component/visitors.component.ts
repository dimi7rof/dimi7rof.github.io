import { Component, DestroyRef, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { interval } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  templateUrl: './visitors.component.html',
  styleUrl: './visitors.component.css',
})
export class VisitorsComponent {
  data = signal<UserData[]>([]);
  exclude = signal(false);
  ip = signal('0.0.0.0');
  page = signal(1);
  pageSize = environment.pageSize;
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.getData();
    interval(60000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.getData());
    this.userService
      .getUserIp()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((ipData) => this.ip.set(ipData.ip));
  }

  getData() {
    this.userService
      .getAll(this.exclude(), this.ip(), this.page() - 1)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: UserData[]) => {
        this.data.set(data);
      });
  }

  filter() {
    this.exclude.update((exclude) => !exclude);
    this.page.set(1);
    this.getData();
  }

  previous() {
    this.page.update((page) => page - 1);
    this.getData();
  }

  next() {
    this.page.update((page) => page + 1);
    this.getData();
  }

  back() {
    this.router.navigate(['/']);
  }
}
