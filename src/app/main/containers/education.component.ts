import { Component } from '@angular/core';

@Component({
  selector: 'education-component',
  standalone: true,
  imports: [],
  template: `
    <section class="wrapper education box left">
      <div class="inner text drop">
        <h3>Education</h3>
        <ul class="list">
          <li>
            <p>2003-2008 PGMET Pazardjik</p>
          </li>
          <li>
            <p>2008-2021 Only working</p>
          </li>
          <li>
            <p>2021-2023 SoftUni University</p>
            <ol>
              <li>C# Basic</li>
              <li>C# Fundamentals</li>
              <li>C# OOP</li>
              <li>C# Advanced</li>
              <li>MSSQL</li>
              <li>EntityFramework</li>
              <li>C# Web Fundamentals</li>
              <li>C# Web Advanced</li>
              <li>HTML & CSS</li>
              <li>JS Front-End</li>
            </ol>
          </li>
          <li>
            <p>2023+ Udemy</p>
            <ol>
              <li>Minimal API</li>
              <li>Docker and K8s</li>
              <li>Advanced SQL</li>
              <li>Angular</li>
            </ol>
          </li>
          <br />
        </ul>
      </div>
    </section>
  `,
})
export class EducationComponent {}
