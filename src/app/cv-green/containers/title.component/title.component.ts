import { Component } from '@angular/core';
import { cvData } from '../../../../assets/cv-data';

@Component({
  selector: 'title-component',
  standalone: true,
  imports: [],
  template: `
    <section class="wrapper head box left">
      <header class="inner welcome">
        <h2 class="flex center three-d-text">{{ cvData.profile.name }}'s CV</h2>
      </header>
    </section>
  `,
  styleUrls: ['./title.component.css', '../../styles.css'],
})
export class TitleComponent {
  cvData = cvData;
}
