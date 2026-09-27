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
  styles: `
    .logos {
      gap: 32px;
    }

    .logos > img {
      height: 60px;
      width: 60px;
      background-color: darkgray;
      border-radius: 55px;
    }

    .skills {
      height: 350px;
    }

    @media (orientation: portrait) {
      .skills {
        height: 520px;
      }

      .logos {
        flex-direction: column;
        padding: 10px;
      }
    }
  `,
})
export class SkillsComponent {
  skills = cvData.skills;
}
