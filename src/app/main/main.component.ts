import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleComponent } from './containers/title.component';
import { SummaryComponent } from './containers/summary.component';
import { EducationComponent } from './containers/education.component';
import { ExperienceComponent } from './containers/experience.component';
import { SkillsComponent } from './containers/skills.component';
import { ContactComponent } from './containers/contact.component';

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
  ],
  templateUrl: './main.component.html',
})
export class MainComponent {}
