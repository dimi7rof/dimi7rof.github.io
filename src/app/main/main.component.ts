import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitleComponent } from './containers/title.component/title.component';
import { SummaryComponent } from './containers/summary.component/summary.component';
import { EducationComponent } from './containers/education.component/education.component';
import { ExperienceComponent } from './containers/experience.component/experience.component';
import { SkillsComponent } from './containers/skills.component/skills.component';
import { ContactComponent } from './containers/contact.component/contact.component';
import { CertificateComponent } from './containers/certificate-component/certificate.component';
import { ProjectsComponent } from './containers/projects-component/projects.component';
import { ScrollToTopComponent } from './containers/scroll-to-top.component/scroll-to-top.component';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { SummaryStatComponent } from './hidden/summary.component/summary.component';
import jsPDF from 'jspdf';
import { cvData } from './cv-data';

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
  downloadPDF() {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;
    const bottom = pageHeight - 16;
    const lineHeight = 4.8;
    let y = 0;

    pdf.setProperties({
      title: `${cvData.profile.name} - Curriculum Vitae`,
      subject: 'Curriculum Vitae',
      author: cvData.profile.name,
    });

    const addPage = () => {
      pdf.addPage();
      y = 20;
      pdf.setTextColor(28, 52, 48);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.text(cvData.profile.name, margin, 12);
      pdf.setDrawColor(38, 119, 85);
      pdf.setLineWidth(0.6);
      pdf.line(margin, 15, pageWidth - margin, 15);
    };

    const ensureSpace = (height: number) => {
      if (y + height > bottom) addPage();
    };

    const addSection = (title: string) => {
      ensureSpace(12);
      y += 4;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(28, 78, 61);
      pdf.text(title.toUpperCase(), margin, y);
      pdf.setDrawColor(156, 197, 175);
      pdf.setLineWidth(0.35);
      pdf.line(margin, y + 2, pageWidth - margin, y + 2);
      y += 8;
    };

    const addParagraph = (
      text: string,
      options: {
        bold?: boolean;
        color?: [number, number, number];
        size?: number;
      } = {},
    ) => {
      const size = options.size ?? 9.5;
      pdf.setFont('helvetica', options.bold ? 'bold' : 'normal');
      pdf.setFontSize(size);
      pdf.setTextColor(...(options.color ?? [55, 65, 63]));
      const lines = pdf.splitTextToSize(text, contentWidth) as string[];
      for (const line of lines) {
        ensureSpace(lineHeight);
        pdf.text(line, margin, y);
        y += lineHeight;
      }
      y += 1;
    };

    const addEntry = (title: string, detail: string, period?: string) => {
      ensureSpace(13);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9.5);
      pdf.setTextColor(37, 46, 43);
      pdf.text(title, margin, y);
      if (period) {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8.5);
        pdf.setTextColor(100, 113, 108);
        pdf.text(period, pageWidth - margin, y, { align: 'right' });
      }
      y += lineHeight;
      addParagraph(detail, { color: [81, 94, 88], size: 9 });
    };

    pdf.setFillColor(25, 53, 48);
    pdf.rect(0, 0, pageWidth, 47, 'F');
    pdf.setFillColor(43, 137, 96);
    pdf.rect(0, 45, pageWidth, 2, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(25);
    pdf.text(cvData.profile.name, margin, 19);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    pdf.setTextColor(193, 226, 207);
    pdf.text(cvData.profile.role.toUpperCase(), margin, 27);

    pdf.setFontSize(8.5);
    pdf.setTextColor(245, 250, 247);
    pdf.textWithLink(cvData.profile.email, margin, 38, {
      url: `mailto:${cvData.profile.email}`,
    });
    pdf.textWithLink('LinkedIn', 82, 38, { url: cvData.profile.linkedinUrl });
    pdf.textWithLink('GitHub', 115, 38, { url: cvData.profile.githubUrl });
    y = 57;

    addSection('Profile');
    addParagraph(cvData.profile.summary);

    addSection('Work experience');
    for (const job of cvData.experience) {
      const period = job.current ? `${job.since} - Present` : job.duration;
      addEntry(job.title, job.company, period);
    }

    addSection('Education and training');
    for (const item of cvData.education) {
      addEntry(item.institution, item.courses.join('  |  '), item.period);
      if (item.courses.length === 0) y -= lineHeight;
    }

    addSection('Digital skills');
    addParagraph(cvData.skills.map((skill) => skill.name).join('  |  '));

    addSection('Projects');
    for (const project of cvData.projects) {
      ensureSpace(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9.5);
      pdf.setTextColor(37, 46, 43);
      pdf.text(project.name, margin, y);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.setTextColor(43, 119, 85);
      pdf.text(project.status, pageWidth - margin, y, { align: 'right' });
      y += lineHeight;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8.5);
      pdf.textWithLink('GitHub repository', margin, y, {
        url: project.githubUrl,
      });
      pdf.textWithLink('Live project', margin + 42, y, {
        url: project.projectUrl,
      });
      y += lineHeight + 2;
    }

    const pageCount = pdf.getNumberOfPages();
    for (let page = 1; page <= pageCount; page++) {
      pdf.setPage(page);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(130, 140, 135);
      pdf.text(
        `${cvData.profile.name}  |  ${page}/${pageCount}`,
        pageWidth - margin,
        pageHeight - 7,
        {
          align: 'right',
        },
      );
    }

    pdf.save('Todor-Dimitrov-CV.pdf');
  }

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
