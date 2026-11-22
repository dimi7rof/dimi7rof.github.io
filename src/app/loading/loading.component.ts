import {
  Component,
  ChangeDetectorRef,
  OnDestroy,
  OnInit,
  input,
} from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent implements OnInit, OnDestroy {
  progress = 1;

  private interval?: ReturnType<typeof setInterval>;
  duration = input(6000);
  private startTime = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.startTime = Date.now();

    this.interval = setInterval(() => {
      const elapsed = Date.now() - this.startTime;

      this.progress = Math.min(
        100,
        1 + Math.floor((elapsed / this.duration()) * 99),
      );

      this.cdr.detectChanges();

      if (this.progress >= 100) {
        this.stop();
      }
    }, 40);
  }

  private stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  ngOnDestroy(): void {
    this.stop();
  }
}
