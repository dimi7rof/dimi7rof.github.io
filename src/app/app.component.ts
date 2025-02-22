import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './main/services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'web-app';
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserIp().subscribe((ipData) => {
      this.userService.getLocation(ipData.ip).subscribe((loc) => {
        const userData = {
          ip: ipData.ip,
          os: this.getOperatingSystem(),
          browser: this.getBrowserInfo(),
          city: loc.city,
          country: loc.country,
          org: loc.org,
        };

        this.userService.sendUserData(userData).subscribe({
          next: () => console.info(userData.ip),
          error: () => console.error('Error'),
        });
      });
    });
  }

  getOperatingSystem(): string {
    const userAgent = navigator.userAgent;
    if (/Windows NT 10.0/.test(userAgent)) return 'Windows 10';
    if (/Windows NT 6.1/.test(userAgent)) return 'Windows 7';
    if (/Mac OS X/.test(userAgent)) return 'MacOS';
    if (/Linux/.test(userAgent)) return 'Linux';
    if (/Android/.test(userAgent)) return 'Android';
    if (/iPhone|iPad|iPod/.test(userAgent)) return 'iOS';
    return 'Unknown';
  }

  getBrowserInfo(): string {
    const userAgent = navigator.userAgent;
    if (/Chrome/.test(userAgent)) return 'Chrome';
    if (/Firefox/.test(userAgent)) return 'Firefox';
    if (/Safari/.test(userAgent)) return 'Safari';
    if (/Edge/.test(userAgent)) return 'Edge';
    return 'Unknown Browser';
  }
}
