import { Component } from '@angular/core';
import { cvData } from '../../cv-data';

@Component({
  selector: 'projects-component',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  projects = cvData.projects;
}
