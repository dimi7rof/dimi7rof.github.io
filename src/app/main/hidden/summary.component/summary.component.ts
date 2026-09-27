import { Component, input, output, signal } from '@angular/core';
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
  data = signal<Data | undefined>(undefined);
  isPopupVisible = input(false);
  closeRequested = output<void>();

  constructor(private userService: UserService) {
    this.userService.getStat().subscribe((data: Data) => {
      this.data.set(data);
    });
  }
  close() {
    this.closeRequested.emit();
  }
}
