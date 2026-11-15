import { Component } from '@angular/core';
import { cvData } from '../../../../assets/cv-data';

@Component({
  selector: 'contact-component',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', '../../styles.css'],
})
export class ContactComponent {
  profile = cvData.profile;
}
