import { Component } from '@angular/core';
import { cvData } from '../../cv-data';

@Component({
  selector: 'projects-component',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css', '../../styles.css'],
})
export class ProjectsComponent {
  projects = cvData.projects;
}
