import { Component, Input } from '@angular/core';
import { UserService } from '../services/user.service';

interface Data {
  monthly: number;
  unique: number;
  all: number;
}

@Component({
  selector: 'sum-stat-component',
  standalone: true,
  template: `
    @if (isPopupVisible) {
    <div class="sum-popup flex center">
      <section class="sum wrapper flex center column gap20">
        <div class="flex center column">
          @if (data) {
          <P>Visits: {{ data.all }}</P>
          <P>Unique visits: {{ data.unique }}</P>
          <P>Monthly visits: {{ data.monthly }}</P>
          } @if (!data) {
          <div class="spinner-container">
            <div class="spinner"></div>
          </div>
          }
        </div>
      </section>
    </div>
    <button class="close-btn" (click)="close()"></button>
    }
  `,
  imports: [],
})
export class SummaryStatComponent {
  data: Data | undefined;
  @Input() isPopupVisible: boolean | undefined;

  constructor(private userService: UserService) {
    this.userService.getStat().subscribe((data: Data) => {
      this.data = data;
    });
  }
  close() {
    this.isPopupVisible = false;
  }
}
