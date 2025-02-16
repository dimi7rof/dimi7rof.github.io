import { Component } from '@angular/core';

@Component({
  selector: 'summary-component',
  standalone: true,
  imports: [],
  template: `
    <section class="summary wrapper box right">
      <div class="text drop flex center column">
        <h3>Summary</h3>
        <p>Hello</p>
        <p>I am not looking for a job</p>
        <p>This page is for practice purpose</p>
      </div>
    </section>
  `,
})
export class SummaryComponent {}
