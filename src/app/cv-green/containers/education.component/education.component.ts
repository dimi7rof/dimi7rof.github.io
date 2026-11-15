import { Component } from '@angular/core';
import { cvData } from '../../../../assets/cv-data';

@Component({
  selector: 'education-component',
  standalone: true,
  imports: [],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css', '../../styles.css'],
})
export class EducationComponent {
  education = cvData.education;
}
