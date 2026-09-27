import { Component } from '@angular/core';

interface Project {
  name: string;
  githubUrl: string;
  projectUrl: string;
  status: string;
}

@Component({
  selector: 'projects-component',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      name: 'Home temperature monitor',
      githubUrl: 'https://github.com/dimi7rof/home-temperature-monitoring/blob/main/README.md',
      projectUrl: 'https://script.google.com/macros/s/AKfycbzDMQon895LRHNiWUZAGKT5nmLH507ovAu4o0UyXnDNGwxza9-pL50HxYm-xvMIdHYeBg/exec',
      status: 'IN WORK',
    },
  ];
}
