import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent implements OnInit, OnDestroy {
  progress = 1;

  private interval?: ReturnType<typeof setInterval>;
  private startTime = 0;

  ngOnInit(): void {
    this.startTime = Date.now();

    this.interval = setInterval(() => {
      const elapsed = Date.now() - this.startTime;

      this.progress = Math.min(100, Math.floor(1 + (elapsed / 4000) * 99));

      if (this.progress === 100) {
        this.stop();
      }
    }, 40);
  }

  private stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  ngOnDestroy(): void {
    this.stop();
  }
}
