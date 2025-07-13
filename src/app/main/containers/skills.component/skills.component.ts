import { Component } from '@angular/core';

@Component({
  selector: 'skills-component',
  standalone: true,
  imports: [],
  template: ` <section class="wrapper skills box left">
    <div class="inner text drop flex center column">
      <h3 class="flex center">Skills</h3>
      <div class="grid center logos">
        <img src="assets/logos/git.png" alt="github" />
        <img src="assets/logos/csharp.png" alt="C#" />
        <img src="assets/logos/sql.png" alt="MSSQL" />
        <img src="assets/logos/docker.png" alt="Docker" />
        <img src="assets/logos/kubernetes.png" alt="Kubernetes" />
        <img src="assets/logos/oauth2.jpg" alt="OAuth2" />
        <img src="assets/logos/masstransit.png" alt="Masstransit" />
        <img src="assets/logos/ang.png" alt="Angular" />
        <img src="assets/logos/html5-logo.png" alt="HTML" />
        <img src="assets/logos/css.webp" alt="CSS" />
        <img src="assets/logos/js.png" alt="JS" />
        <img src="assets/logos/excel.svg" alt="Excel" />
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
export class SkillsComponent {}
