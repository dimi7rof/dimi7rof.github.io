import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';

interface Data {
  monthly: number;
  unique: number;
  all: number;
}

@Component({
  selector: 'sum-stat-component',
  standalone: true,
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
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
