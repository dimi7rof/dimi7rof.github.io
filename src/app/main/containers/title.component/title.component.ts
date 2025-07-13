import { Component } from '@angular/core';

@Component({
  selector: 'title-component',
  standalone: true,
  imports: [],
  template: `
    <section class="wrapper head box left">
      <header class="inner welcome">
        <h2 class="flex center three-d-text">Welcome to Todor's CV</h2>
      </header>
    </section>
  `,
  styles: `
.head {
  height: 60px;
}

.welcome {
  position: absolute;
  top: -100px; /* Start from above */
  left: 50%;
  transform: translateX(-50%); /* Center horizontally */
  opacity: 0;
  animation: fallDown 2s ease-out forwards;
}

.three-d-text {
  font-family: "Courier New", Courier, monospace;
  font-size: 1.4rem;
  font-weight: bold;
  color: rgb(255, 255, 255);
}

@media (orientation: portrait) {
  .three-d-text {
    font-size: 1.2rem;
  }
}
`,
})
export class TitleComponent {}
