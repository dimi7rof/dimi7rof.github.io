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
export class MainComponent {}
