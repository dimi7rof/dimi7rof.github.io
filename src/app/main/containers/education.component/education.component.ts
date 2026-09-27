import { Component } from '@angular/core';
import { cvData } from '../../cv-data';

@Component({
  selector: 'education-component',
  standalone: true,
  imports: [],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
})
export class EducationComponent {
  education = cvData.education;
}
