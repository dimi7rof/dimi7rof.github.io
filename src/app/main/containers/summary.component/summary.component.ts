import { Component } from '@angular/core';

@Component({
  selector: 'summary-component',
  standalone: true,
  imports: [],
  template: ` <section class="summary wrapper box right">
    <div class="text drop flex center column">
      <h3>Summary</h3>
      <p>Hello</p>
      <p>I am <b>not</b> looking for a job</p>
      <p>This page is for practice only</p>
    </div>
  </section>`,
  styles: `
.summary {
  height: 350px;
}
`,
})
export class SummaryComponent {}
