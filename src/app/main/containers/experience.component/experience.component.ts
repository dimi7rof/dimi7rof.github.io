import { Component } from '@angular/core';

@Component({
  selector: 'experience-component',
  standalone: true,
  imports: [],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
})
export class ExperienceComponent {
  currentPossitionTime: any;
  startDate: Date = new Date('September 1, 2023 09:00:00');
  years: number = 0;
  months: number = 0;
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  ngOnInit() {
    this.updateTimer();
    setInterval(() => this.updateTimer(), 1000);
  }

  updateTimer() {
    const multiplier = 60 * 60 * 1000;
    const currentDate = new Date();
    const diff = currentDate.getTime() - this.startDate.getTime();

    this.years = Math.floor(diff / (365.25 * 24 * multiplier));
    this.months =
      currentDate.getMonth() - 8 < 1
        ? currentDate.getMonth() - 8 + 12
        : currentDate.getMonth() - 8;
    this.days = currentDate.getDate() - 1;
    this.hours = Math.floor((diff % (24 * multiplier)) / multiplier);
    this.minutes = Math.floor((diff % multiplier) / (60 * 1000));
    this.seconds = Math.floor((diff % (60 * 1000)) / 1000);

    this.currentPossitionTime = `${this.years} years, ${this.months} months, ${
      this.days
    } days, ${this.hours.toString().padStart(2, '0')}:${this.minutes
      .toString()
      .padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
  }
}
