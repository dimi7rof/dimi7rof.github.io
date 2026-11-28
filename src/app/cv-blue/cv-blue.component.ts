import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { cvData } from '../../assets/cv-data';
import { UserService } from '../services/user.service';

type Section =
  | 'profile'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'contact';

@Component({
  selector: 'app-cv-blue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-blue.component.html',
  styleUrls: ['./cv-blue.component.css'],
})
export class CVBlueComponent {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.userService.getUserIp().subscribe((ipData) => {
      this.userService.getLocation(ipData.ip).subscribe((loc) => {
        const userData = {
          ip: ipData.ip,
          os: this.userService.getOperatingSystem(),
          browser: this.userService.getBrowserInfo(),
          city: loc.city,
          country: loc.country,
          org: loc.org,
          page: 'cv-blue',
        };

        this.userService.sendUserData(userData).subscribe({
          next: () => console.debug(userData.ip),
          error: () => console.error('Error'),
        });
      });
    });
  }

  profile = cvData.profile;
  experience = cvData.experience;
  education = cvData.education;
  skills = cvData.skills;
  projects = cvData.projects;

  activeSection = signal<Section>('profile');
  summaryExpanded = signal(true);

  navigateBack() {
    this.router.navigate(['/cv-green']);
  }

  getSectionLabel(section: Section): string {
    return section.charAt(0).toUpperCase() + section.slice(1);
  }

  getExperienceDuration(exp: any) {
    if (exp.current === true) return 'Present';
    if (exp.duration) return exp.duration;
    if (exp.since) return `${exp.since} - Present`;
    return '';
  }

  formatPeriod(period?: string): string {
    if (!period) return '';
    return period;
  }

  toggleSummary() {
    this.summaryExpanded.update((v: boolean) => !v);
  }
}
