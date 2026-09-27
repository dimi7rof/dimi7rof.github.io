import { Component } from '@angular/core';
import { cvData } from '../../cv-data';

@Component({
  selector: 'contact-component',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  profile = cvData.profile;
}
