import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  standalone: true,
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form (ngSubmit)="onSubmit()">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          [(ngModel)]="username"
          required
        />

        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          [(ngModel)]="password"
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  `,
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response === true) {
          this.router.navigate(['/stat']);
        } else {
          alert('Invalid username or password');
        }
      },
      error: () => {
        alert('An error occurred while logging in');
      },
    });
  }
}
