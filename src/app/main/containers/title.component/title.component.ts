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
  styleUrl: './title.component.css',
})
export class TitleComponent {}
