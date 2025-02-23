import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitleComponent } from './containers/title.component';
import { SummaryComponent } from './containers/summary.component';
import { EducationComponent } from './containers/education.component';
import { ExperienceComponent } from './containers/experience.component';
import { SkillsComponent } from './containers/skills.component';
import { ContactComponent } from './containers/contact.component';
import { CertificateComponent } from './containers/certificate.component';
import { ScrollToTopComponent } from './containers/scroll-to-top.component';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'main-component',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    SummaryComponent,
    EducationComponent,
    ExperienceComponent,
    SkillsComponent,
    ContactComponent,
    CertificateComponent,
    ScrollToTopComponent,
  ],
  templateUrl: './main.component.html',
})
export class MainComponent {
  constructor(private router: Router, private userService: UserService) {
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

  openLogin() {
    this.router.navigate(['/stat']);
  }
}
