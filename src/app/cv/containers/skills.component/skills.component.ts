import { Component } from '@angular/core';
import { cvData } from '../../cv-data';

@Component({
  selector: 'skills-component',
  standalone: true,
  imports: [],
  template: ` <section class="wrapper skills box left">
    <div class="inner text drop flex center column">
      <h3 class="flex center">Skills</h3>
      <div class="grid center logos">
        @for (skill of skills; track skill.name) {
          <img [src]="skill.logo" [alt]="skill.name" />
        }
      </div>
    </div>
  </section>`,
  styleUrls: ['./skills.component.css', '../../styles.css'],
})
export class SkillsComponent {
  skills = cvData.skills;
}
