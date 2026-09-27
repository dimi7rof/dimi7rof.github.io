import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { cvData } from './cv-data';
import { CertificateComponent } from './containers/certificate-component/certificate.component';
import { ContactComponent } from './containers/contact.component/contact.component';
import { EducationComponent } from './containers/education.component/education.component';
import { ExperienceComponent } from './containers/experience.component/experience.component';
import { ProjectsComponent } from './containers/projects-component/projects.component';
import { ScrollToTopComponent } from './containers/scroll-to-top.component/scroll-to-top.component';
import { SkillsComponent } from './containers/skills.component/skills.component';
import { SummaryComponent } from './containers/summary.component/summary.component';
import { TitleComponent } from './containers/title.component/title.component';
import { SummaryStatComponent } from './hidden/summary.component/summary.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'main-component',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    SummaryComponent,
    EducationComponent,
    ExperienceComponent,
    SkillsComponent,
    ContactComponent,
    ProjectsComponent,
    CertificateComponent,
    ScrollToTopComponent,
    SummaryStatComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  summaryPopupVisible = false;

  constructor(
    private router: Router,
    private userService: UserService,
  ) {
    this.userService.getUserIp().subscribe((ipData) => {
      this.userService.getLocation(ipData.ip).subscribe((loc) => {
        const userData = {
          ip: ipData.ip,
          os: this.getOperatingSystem(),
          browser: this.getBrowserInfo(),
          city: loc.city,
          country: loc.country,
          org: loc.org,
        };

        this.userService.sendUserData(userData).subscribe({
          next: () => console.info(userData.ip),
          error: () => console.error('Error'),
        });
      });
    });
  }

  downloadPDF() {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const sidebarWidth = 62;
    const sidebarPadding = 6;
    const mainX = 72;
    const mainWidth = pageWidth - mainX - 13;
    const mainBottom = pageHeight - 14;
    const lineHeight = 4.2;
    let y = 18;
    let pageNumber = 0;

    pdf.setProperties({
      title: `${cvData.profile.name} - Curriculum Vitae`,
      subject: 'Curriculum Vitae',
      author: cvData.profile.name,
    });

    const drawSidebar = () => {
      pdf.setFillColor(241, 244, 246);
      pdf.rect(0, 0, sidebarWidth, pageHeight, 'F');
      pdf.setFillColor(52, 88, 132);
      pdf.rect(0, 0, sidebarWidth, 38, 'F');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(15);
      pdf.setTextColor(255, 255, 255);
      const nameLines = pdf.splitTextToSize(
        cvData.profile.name,
        sidebarWidth - sidebarPadding * 2,
      ) as string[];
      pdf.text(nameLines, sidebarWidth / 2, 14, { align: 'center' });
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(225, 235, 246);
      pdf.text(cvData.profile.role, sidebarWidth / 2, 31, {
        align: 'center',
        maxWidth: sidebarWidth - sidebarPadding * 2,
      });

      let sidebarY = 47;
      const addSidebarHeading = (heading: string) => {
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(10);
        pdf.setTextColor(52, 88, 132);
        pdf.text(heading, sidebarPadding, sidebarY);
        sidebarY += 6;
      };
      const addSidebarLink = (label: string, url: string) => {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(7.3);
        pdf.setTextColor(53, 62, 69);
        const lines = pdf.splitTextToSize(
          label,
          sidebarWidth - sidebarPadding * 2,
        ) as string[];
        for (const line of lines) {
          pdf.textWithLink(line, sidebarPadding, sidebarY, { url });
          sidebarY += 4.3;
        }
        sidebarY += 1;
      };

      addSidebarHeading('Contact');
      addSidebarLink(cvData.profile.email, `mailto:${cvData.profile.email}`);
      addSidebarLink('LinkedIn profile', cvData.profile.linkedinUrl);
      addSidebarLink('GitHub profile', cvData.profile.githubUrl);

      sidebarY += 3;
      addSidebarHeading('Skills');
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(53, 62, 69);
      for (const skill of cvData.skills) {
        const lines = pdf.splitTextToSize(
          skill.name,
          sidebarWidth - sidebarPadding * 2 - 3,
        ) as string[];
        pdf.setFillColor(52, 88, 132);
        pdf.circle(sidebarPadding + 1, sidebarY - 0.8, 0.65, 'F');
        pdf.text(lines, sidebarPadding + 3, sidebarY);
        sidebarY += lines.length * 4.1 + 2;
      }

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7);
      pdf.setTextColor(122, 132, 140);
      pdf.textWithLink('github.com/dimi7rof', sidebarPadding, pageHeight - 9, {
        url: cvData.profile.githubUrl,
      });
    };

    const startPage = () => {
      if (pageNumber > 0) pdf.addPage();
      pageNumber += 1;
      drawSidebar();
      y = 18;
    };

    const ensureSpace = (height: number) => {
      if (y + height > mainBottom) startPage();
    };

    const addSection = (title: string) => {
      ensureSpace(12);
      y += 2;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(13);
      pdf.setTextColor(52, 88, 132);
      pdf.text(title, mainX, y);
      pdf.setDrawColor(211, 216, 220);
      pdf.setLineWidth(0.3);
      pdf.line(mainX, y + 2.2, pageWidth - 13, y + 2.2);
      y += 8;
    };

    const addEntry = (title: string, detail: string, period?: string) => {
      const titleWidth = period ? mainWidth - 35 : mainWidth;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8.8);
      const titleLines = pdf.splitTextToSize(title, titleWidth) as string[];
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8.1);
      const detailLines = detail
        ? (pdf.splitTextToSize(detail, mainWidth) as string[])
        : [];
      ensureSpace(
        titleLines.length * lineHeight + detailLines.length * lineHeight + 3,
      );

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8.8);
      pdf.setTextColor(44, 49, 54);
      pdf.text(titleLines, mainX, y);
      if (period) {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(7.8);
        pdf.setTextColor(85, 96, 104);
        pdf.text(period, pageWidth - 13, y, { align: 'right' });
      }
      y += titleLines.length * lineHeight;
      if (detailLines.length > 0) {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8.1);
        pdf.setTextColor(76, 84, 90);
        pdf.text(detailLines, mainX, y);
        y += detailLines.length * lineHeight;
      }
      y += 2.5;
    };

    startPage();
    addSection('Profile');
    addEntry(cvData.profile.role, cvData.profile.summary);

    addSection('Education');
    for (const item of cvData.education) {
      addEntry(item.institution, '', item.period);
    }

    addSection('Work experience');
    for (const job of cvData.experience) {
      const period = job.current ? `${job.since} - Present` : job.duration;
      addEntry(job.title, job.company, period);
    }

    addSection('Certificates and training');
    for (const item of cvData.education) {
      if (item.courses.length > 0) {
        addEntry(item.institution, item.courses.join('  |  '), item.period);
      }
    }

    addSection('Projects');
    for (const project of cvData.projects) {
      ensureSpace(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8.8);
      pdf.setTextColor(44, 49, 54);
      pdf.text(project.name, mainX, y);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7.8);
      pdf.setTextColor(85, 96, 104);
      pdf.text(project.status, pageWidth - 13, y, { align: 'right' });
      y += lineHeight;
      pdf.setFontSize(8.1);
      pdf.setTextColor(52, 88, 132);
      pdf.textWithLink('GitHub repository', mainX, y, {
        url: project.githubUrl,
      });
      pdf.textWithLink('Live project', mainX + 38, y, {
        url: project.projectUrl,
      });
      y += lineHeight + 2;
    }

    const pageCount = pdf.getNumberOfPages();
    for (let page = 1; page <= pageCount; page++) {
      pdf.setPage(page);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7.5);
      pdf.setTextColor(135, 142, 148);
      pdf.text(`${page} / ${pageCount}`, pageWidth - 13, pageHeight - 6, {
        align: 'right',
      });
    }

    pdf.save('Todor-Dimitrov-CV.pdf');
  }

  showSummary() {
    this.summaryPopupVisible = !this.summaryPopupVisible;
  }

  getOperatingSystem(): string {
    const userAgent = navigator.userAgent;
    if (/Windows NT 10.0/.test(userAgent)) return 'Windows 10';
    if (/Windows NT 6.1/.test(userAgent)) return 'Windows 7';
    if (/Mac OS X/.test(userAgent)) return 'MacOS';
    if (/Linux/.test(userAgent)) return 'Linux';
    if (/Android/.test(userAgent)) return 'Android';
    if (/iPhone|iPad|iPod/.test(userAgent)) return 'iOS';
    return 'Unknown';
  }

  getBrowserInfo(): string {
    const userAgent = navigator.userAgent;
    if (/Chrome/.test(userAgent)) return 'Chrome';
    if (/Firefox/.test(userAgent)) return 'Firefox';
    if (/Safari/.test(userAgent)) return 'Safari';
    if (/Edge/.test(userAgent)) return 'Edge';
    return 'Unknown Browser';
  }

  openHistory() {
    this.router.navigate(['/stat']);
  }

  openLinks() {
    this.router.navigate(['/links']);
  }

  openSudoku() {
    this.router.navigate(['/sudoku']);
  }
}
