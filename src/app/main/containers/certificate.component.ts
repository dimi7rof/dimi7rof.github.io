import { Component } from '@angular/core';

@Component({
  selector: 'cert-component',
  standalone: true,
  imports: [],
  template: `
    <section class="wrapper cert flex center column gap20">
      <header>
        <h3>Certificates</h3>
      </header>
      <div class="certPics">
        <div><img src="assets/Pictures/Basic.jpg" alt="" /></div>
        <div><img src="assets/Pictures/basic1.png" alt="" /></div>
        <div><img src="assets/Pictures/Fund.jpg" alt="" /></div>
        <div><img src="assets/Pictures/Fund1.jpg" alt="" /></div>
        <div><img src="assets/Pictures/OOP.jpg" alt="" /></div>
        <div><img src="assets/Pictures/oop1.jpg" alt="" /></div>
        <div><img src="assets/Pictures/Adv.jpg" alt="" /></div>
        <div><img src="assets/Pictures/adv1.png" alt="" /></div>
        <div><img src="assets/Pictures/MSSQL.jpg" alt="" /></div>
        <div><img src="assets/Pictures/sql1.jpg" alt="" /></div>
        <div><img src="assets/Pictures/EFC.jpg" alt="" /></div>
        <div><img src="assets/Pictures/efc1.jpg" alt="" /></div>
        <div><img src="assets/Pictures/aspFund.jpg" alt="" /></div>
        <div><img src="assets/Pictures/aspfund1.jpg" alt="" /></div>
        <div><img src="assets/Pictures/aspAdv.jpg" alt="" /></div>
        <div><img src="assets/Pictures/aspadv1.jpg" alt="" /></div>
        <div><img src="assets/Pictures/html.jpg" alt="" /></div>
        <div><img src="assets/Pictures/html1.jpg" alt="" /></div>
        <div><img src="assets/Pictures/js.png" alt="" /></div>
        <div><img src="assets/Pictures/js1.png" alt="" /></div>
      </div>
      <div class="udemy">
        <img src="assets/Pictures/MinimalAPI.png" alt="" />
        <img src="assets/Pictures/DockerAndK8s.jpg" alt="" />
        <img src="assets/Pictures/sql.jpg" alt="" />
        <img src="assets/Pictures/Angular.jpg" alt="" />
      </div>
    </section>
  `,
})
export class CertificateComponent {}
