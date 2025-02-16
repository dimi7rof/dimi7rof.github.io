import { Component } from '@angular/core';

@Component({
  selector: 'contact-component',
  standalone: true,
  imports: [],
  template: `
    <section class="wrapper info box right">
      <div class="inner text rise flex center column gap20">
        <h3>Contacts</h3>
        <div class="social">
          <i>
            <a
              class="fa-solid fa-envelope"
              href="mailto:dimi7rof@gmail.com?subject=Offer, you cannot refuse&body=Hello. We would like to make an offer to you."
            ></a>
          </i>
          <i>
            <a
              class="fa-brands fa-linkedin-in"
              href="http://linkedin.com/in/dimi7rof"
              target="_blank"
            ></a>
          </i>
          <i>
            <a
              class="fa-brands fa-github"
              href="https://github.com/dimi7rof"
              target="_blank"
            ></a>
          </i>
          <i>
            <a
              class="fab fa-facebook-f"
              href="http://facebook.com/dimi7rof"
              target="_blank"
            ></a>
          </i>
        </div>
        <div>
          <ul class="flex center column">
            <li class="flex center column wide50">
              <p>+359 883 470 209</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {}
