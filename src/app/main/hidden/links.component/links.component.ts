import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'links-component',
  standalone: true,
  templateUrl: './links.component.html',
  styleUrl: './links.component.css',
  imports: [],
})
export class LinksComponent {
  links = [
    {
      title: 'C# Fundamentals',
      items: [
        {
          url: 'https://www.youtube.com/watch?v=qEIy8xEhJTg',
          label: 'Resources',
        },
        {
          url: 'https://www.youtube.com/watch?v=qqBXjHqSWzI',
          label: 'IT Talks',
        },
        {
          url: 'https://www.youtube.com/watch?v=YRJBYfxny4U',
          label: 'Exercise: Data Types and Variables',
        },
        {
          url: 'https://www.youtube.com/watch?v=1YS1h0ENek0',
          label: 'Data Types and Variables',
        },
        {
          url: 'https://www.youtube.com/watch?v=jpwilEUyTn8?t=1822',
          label: 'HTML and CSS Basics',
        },
        {
          url: 'https://www.youtube.com/watch?v=mPOkDntXyfg',
          label: 'Exercise: Arrays',
        },
        {
          url: 'https://www.youtube.com/watch?v=x79iDXGOlyc?t=1620',
          label: 'Arrays',
        },
        {
          url: 'https://www.youtube.com/watch?v=ee0UAfrsLAM',
          label: 'Software Dev. Concepts - Part 1',
        },
        {
          url: 'https://www.youtube.com/watch?v=Big7LzbpEkQ',
          label: 'Exercise: Methods',
        },
        {
          url: 'https://www.youtube.com/watch?v=y6KXzRzZpKE',
          label: 'Methods',
        },
        {
          url: 'https://www.youtube.com/watch?v=X3I9kfE8Qps',
          label: 'Software Dev. Concepts - 2 (S.Nakov)',
        },
        {
          url: 'https://www.youtube.com/watch?v=iYzMbb01IA4',
          label: 'Exercise:Lists',
        },
        { url: 'https://www.youtube.com/watch?v=VGq1e1BOdmA', label: 'Lists' },
        {
          url: 'https://www.youtube.com/watch?v=iu7PUPrQKSk',
          label: 'Exam Preparation',
        },
        {
          url: 'https://www.youtube.com/watch?v=s3-9PhsEVjg',
          label: 'Exercise: Objects and Classes',
        },
        {
          url: 'https://www.youtube.com/watch?v=O6HPBOoCwwg',
          label: 'Objects and Classes',
        },
        {
          url: 'https://www.youtube.com/watch?v=clytLKNJehQ',
          label: 'Bitwise Operations',
        },
        {
          url: 'https://www.youtube.com/watch?v=1XaSaPu6MH4',
          label: 'Exercise: Associative Arrays',
        },
        {
          url: 'https://www.youtube.com/watch?v=2UJp1oiltPY',
          label: 'Associative Arrays',
        },
        {
          url: 'https://www.youtube.com/watch?v=m41wRY2zDVk',
          label: 'Problem Solving',
        },
        {
          url: 'https://www.youtube.com/watch?v=Tj4NfZjrJi4',
          label: 'Exercise: Text Processing',
        },
        {
          url: 'https://www.youtube.com/watch?v=dTkrTaDv1o4',
          label: 'Text Processing',
        },
        {
          url: 'https://www.youtube.com/watch?v=R8fpoq2B7Lg',
          label: 'Database Basics',
        },
        {
          url: 'https://www.youtube.com/watch?v=jYRVln5uokw',
          label: 'Exercise: Regular Expressions',
        },
        {
          url: 'https://www.youtube.com/watch?v=M0C9PRiUluo',
          label: 'Regular Expressions',
        },
        {
          url: 'https://www.youtube.com/watch?v=f2IU8VtKOg4',
          label: 'Git and GitHub',
        },
        {
          url: 'https://www.youtube.com/watch?v=YncEYyhGD7s',
          label: 'Exam Preparation2',
        },
        {
          url: 'https://www.youtube.com/watch?v=nKfg0xiPYIU',
          label: 'Exam Preparation1',
        },
        {
          url: 'https://www.youtube.com/watch?v=v7QRcBbO32Y',
          label: 'QA Introduction',
        },
        {
          url: 'https://www.youtube.com/watch?v=Swm4iEfxkRU',
          label: 'Basic Web Project',
        },
      ],
    },
    {
      title: 'C# Advanced',
      items: [
        {
          url: 'https://www.youtube.com/watch?v=5gN7onLn0xU',
          label: 'Course Introduction',
        },
        { url: 'https://youtu.be/ahJNFgbcbc8', label: 'Exercise' },
        {
          url: 'https://www.youtube.com/watch?v=0DNCQRisf',
          label: 'Stacks and Queues',
        },
        { url: 'https://youtu.be/rNr4KTwKwk8', label: 'Exercise' },
        {
          url: 'https://youtu.be/3dVoFMcC2qE',
          label: 'Multidimensional Arrays',
        },
        { url: 'https://youtu.be/xcJPwhcPNHc', label: 'Exercise' },
        {
          url: 'https://youtu.be/xSFlKL5FZi8',
          label: 'Sets and Dictionaries Advanced',
        },
        { url: 'https://youtu.be/wl_qSDbUil8', label: 'Exercise' },
        {
          url: 'https://youtu.be/ulFLjTqEciA',
          label: 'Streams, Files and Directories',
        },
        { url: 'https://youtu.be/kGT5xX4Vvu4', label: 'Exercise' },
        {
          url: 'https://youtu.be/hEwSqJdZp9Y',
          label: 'Functional Programming',
        },
        { url: 'https://youtu.be/pd_6ElH6B78', label: 'Exercise' },
        { url: 'https://youtu.be/2NAUIxo3bJA', label: 'Defining classes' },
        {
          url: 'https://youtu.be/bMlZo2XXcBE',
          label: 'Implementing Linked List',
        },
        {
          url: 'https://youtu.be/mQwzT9cMfTA',
          label: 'Implementing Stack and Queue',
        },
        { url: 'https://youtu.be/I4R3BnjDR0M', label: 'Exercise' },
        { url: 'https://youtu.be/BXyFCyfgYqk', label: 'Generics' },
        { url: 'https://youtu.be/75wvJHW6N9A', label: 'Exercise' },
        {
          url: 'https://youtu.be/raKE0ABuWOo',
          label: 'Iterators and Comparators',
        },
        { url: 'https://youtu.be/CXNnpvtwn14', label: 'Exam Preparation2' },
        { url: 'https://youtu.be/4ZSxohofwTA', label: 'Exam Preparation1.2' },
        {
          url: 'https://www.youtube.com/watch?v=eMqrCwiRWZ8',
          label: 'Exam Preparation1.1',
        },
        {
          url: 'https://youtu.be/2dm3omhRlag',
          label: 'Algorithms Introduction',
        },
      ],
    },
    {
      title: 'C# OOP',
      items: [
        {
          url: 'https://www.youtube.com/watch?v=xqXUUiYFb2c',
          label: 'Exercise: Inheritance',
        },
        { url: 'https://youtu.be/mNYxFLyiWQs', label: 'Inheritance' },
        {
          url: 'https://youtu.be/j8NArvbylnA',
          label: 'Exercise: Encapsulation',
        },
        {
          url: 'https://www.youtube.com/watch?v=4Vf0bp2DCQQ',
          label: 'Encapsulation',
        },
        {
          url: 'https://youtu.be/oolvmuYqYY4',
          label: 'Exercise: Interfaces and Abstraction',
        },
        {
          url: 'https://youtu.be/vR88YOKGzoI',
          label: 'Interfaces and Abstraction',
        },
        {
          url: 'https://youtu.be/CW2aTx5G1Yg',
          label: 'Exercise: Polymorphism',
        },
        {
          url: 'https://www.youtube.com/watch?v=CW2aTx5G1Yg',
          label: 'Polymorphism',
        },
        { url: 'https://youtu.be/GouvhhzvOWg', label: 'Exception Handling' },
        { url: 'https://youtu.be/xz6HIHgUtVU', label: 'Debugging Techniques' },
        { url: 'https://youtu.be/tVEY7kcQ7JE', label: 'Exercise: SOLID' },
        { url: 'https://youtu.be/W3jzsCWXkbw', label: 'SOLID' },
        {
          url: 'https://youtu.be/CFm_qL-lhdc',
          label: 'Exercise: Reflection and Attributes',
        },
        {
          url: 'https://www.youtube.com/watch?v=ERofkjV12PM',
          label: 'Reflection and Attributes',
        },
        {
          url: 'https://youtu.be/pBRW0BG6hi8',
          label: 'Exercise: Unit Testing',
        },
        { url: 'https://youtu.be/D6AXSAsKxxM', label: 'Unit Testing' },
        {
          url: 'https://youtu.be/5xBsp6wd7aU',
          label: 'Exercise: Mocking and Test Driven Development',
        },
        {
          url: 'https://youtu.be/uA17rRihQz0',
          label: 'Mocking and Test Driven Development',
        },
        {
          url: 'https://youtu.be/8OXH5h9lQeg',
          label: 'Exercise: Design Patterns',
        },
        { url: 'https://youtu.be/wyVeGKRCmJw', label: 'Design Patterns' },
        { url: 'https://youtu.be/epMljGtkTDE', label: 'Workshop2' },
        { url: 'https://youtu.be/1MN8kjw7P24', label: 'Workshop' },
        { url: 'https://youtu.be/zbeEGjcWvDs', label: 'Exam Preparation2' },
        { url: 'https://youtu.be/pCCHojcAh7g', label: 'Exam Preparation' },
        { url: 'https://youtu.be/DXfauRlRPF4', label: 'Q&A Session' },
      ],
    },
    {
      title: 'MSSQL',
      items: [
        {
          url: 'https://youtu.be/eXORxoifLsA',
          label: 'Exercise: Databases Introduction',
        },
        {
          url: 'https://youtu.be/4uwArOTPlyQ',
          label: 'Databases Introduction',
        },
        { url: 'https://youtu.be/t9c99o85qO0', label: 'Exercise: CRUD' },
        { url: 'https://youtu.be/QYEeddOCe4U', label: 'CRUD' },
        {
          url: 'https://youtu.be/vxoCxg6iZoA',
          label: 'Exercise: Table Relations',
        },
        { url: 'https://youtu.be/U7tTwG0rdGk', label: 'Table Relations' },
        {
          url: 'https://youtu.be/lTcVkQcPbK4',
          label: 'Exercise: Built-in Functions',
        },
        { url: 'https://youtu.be/WO5L-QIJs8A', label: 'Built-in Functions' },
        {
          url: 'https://youtu.be/wvgXDwuJPZw',
          label: 'Exercise: Subqueries and Joins',
        },
        { url: 'https://youtu.be/hEEcqb3dtDg', label: 'Subqueries and Joins' },
        {
          url: 'https://youtu.be/dgfbxPcm_KE',
          label: 'Exercise: Indices and Data Aggregation',
        },
        {
          url: 'https://youtu.be/bKfYTmtqJ_w',
          label: 'Indices and Data Aggregation',
        },
        {
          url: 'https://youtu.be/p0vo1OPVbHE',
          label: 'Exercise: Functions and Procedures',
        },
        {
          url: 'https://youtu.be/p0vo1OPVbHE',
          label: 'Exercise: Functions and Procedures',
        },
        {
          url: 'https://youtu.be/74OjdxPS0lk',
          label: 'Functions and Procedures',
        },
        {
          url: 'https://youtu.be/mYJOHmUZEk8',
          label: 'Triggers and Transactions',
        },
        { url: 'https://youtu.be/CKJuqFM3H_c', label: 'Exam Preparation2' },
        { url: 'https://youtu.be/EtxiCbl2aXM', label: 'Exam Preparation' },
      ],
    },
    {
      title: 'Entity Framework Core',
      items: [
        { url: 'https://youtu.be/eOcwBL3MUD8', label: 'Exercise: ADO.NET' },
        { url: 'https://youtu.be/CM-WA6I2J-o', label: 'ADO.NET' },
        {
          url: 'https://youtu.be/ZGym70dIHo0',
          label: 'Exercise: ORM Fundamentals',
        },
        { url: 'https://youtu.be/63WO4A7TRhY', label: 'ORM Fundamentals' },
        {
          url: 'https://youtu.be/B5IDAcsXvaI',
          label: 'Exercise: Entity Framework Introduction',
        },
        {
          url: 'https://youtu.be/FV_AlWkEyK0',
          label: 'Entity Framework Introduction',
        },
        {
          url: 'https://youtu.be/tZg2kz4d4qs',
          label: 'Exercise: Entity Relations',
        },
        { url: 'https://youtu.be/wgE45bUz4mE', label: 'Entity Relations' },
        { url: 'https://youtu.be/Hnz76IBAfOk', label: 'Exercise: LINQ' },
        { url: 'https://youtu.be/_sO7dNDts3s', label: 'LINQ' },
        {
          url: 'https://youtu.be/QWZxnhYMoVU',
          label: 'Exercise: Advanced Querying',
        },
        { url: 'https://youtu.be/nYmjgsPNzX8', label: 'Advanced Querying' },
        {
          url: 'https://youtu.be/sl0V73si3PI',
          label: 'Exercise: C# Auto Mapping Objects',
        },
        {
          url: 'https://youtu.be/qVBdRNtGrv0',
          label: 'C# Auto Mapping Objects',
        },
        {
          url: 'https://youtu.be/yBEJKYsK8VE',
          label: 'Exercise: JSON Processing',
        },
        { url: 'https://youtu.be/u13fDCMboUM', label: 'JSON Processing' },
        {
          url: 'https://youtu.be/d9sXFUzij-Y',
          label: 'Exercise: XML Processing',
        },
        { url: 'https://youtu.be/Gz8JJ-MxntY', label: 'XML Processing' },
        {
          url: 'https://youtu.be/Yocjk4eyvks',
          label: 'Exercise: Best Practices And Architecture',
        },
        {
          url: 'https://youtu.be/Eh4QD7XQys8',
          label: 'Best Practices And Architecture',
        },
        { url: 'https://youtu.be/dlvN-A_KjO8', label: 'Workshop' },
        { url: 'https://youtu.be/DFUBE58yrrY', label: 'Workshop' },
        { url: 'https://youtu.be/z_cYMKyNMlE', label: 'NoSQL' },
        { url: 'https://youtu.be/fbp82mE27_s', label: 'Exam Preparation1.5' },
        { url: 'https://youtu.be/KhvaAzFCRX0', label: 'Exam Preparation2' },
        { url: 'https://youtu.be/W9Clq1nF8ak', label: 'Exam Preparation' },
      ],
    },
    {
      title: 'ASP.NET',
      items: [
        {
          url: 'https://www.youtube.com/watch?v=f0sqOnKwIMg',
          label: 'Web Server - HTTP Protocol',
        },
        {
          url: 'https://youtu.be/6ibb0RHTO8k',
          label: 'Web Server - Asynchronous Processing',
        },
        {
          url: 'https://youtu.be/rGFb9OJXJpw',
          label: 'Web Server - State Management',
        },
        { url: 'https://youtu.be/YPiuv8sljlY', label: 'Workshop' },
        { url: 'https://youtu.be/PDvQOQ42jaI', label: 'MVC Introduction' },
        { url: 'https://youtu.be/MTzJ0as3RBo', label: 'CONSULTING DAY' },
        {
          url: 'https://youtu.be/jy4owq-aR3g',
          label: 'MVC Advanced - View Engine',
        },
        { url: 'https://youtu.be/Hri4BW3o6w8', label: 'Workshop' },
        {
          url: 'https://youtu.be/DO_H4eLIwGA',
          label: 'MVC Advanced - IoC and Data Binding',
        },
        { url: 'https://youtu.be/CItncWowEPY', label: 'Workshop' },
        { url: 'https://youtu.be/qypRqBfxVeE', label: 'Exam Preparation' },
      ],
    },
    {
      title: 'Additionals',
      items: [
        { url: 'https://youtu.be/TewMxkTddQk', label: 'Introduction to HTML' },
        {
          url: 'https://www.youtube.com/watch?v=25Fj5iMRFIg',
          label: 'Introduction to CSS',
        },
        {
          url: 'https://www.youtube.com/watch?v=KrTMzYhpo3E',
          label: 'C# Masterclass - C# Tips and Tricks',
        },
        {
          url: 'https://youtu.be/saKCqoBwUTg',
          label: 'Custom unit testing framework',
        },
        {
          url: 'https://youtu.be/9tutJrjpRd0',
          label: 'Text Processing and Regular Expressions',
        },
        {
          url: 'https://youtu.be/Ob2uN8XdQmY',
          label: 'C# Advanced - Functional Programming',
        },
        {
          url: 'https://youtu.be/LkWis2vrUIE',
          label: 'Reflection Masterclass',
        },
        {
          url: 'https://youtu.be/Fcj2tyRk-8w',
          label: 'Working with Abstraction',
        },
        {
          url: 'https://www.youtube.com/watch?v=KIKbqh7UEos',
          label:
            'Recursion Introduction. All paths in a Labyrinth. Eight queens problem.',
        },
        { url: 'https://youtu.be/n60kNS09ZDs', label: 'Git and GitHub' },
      ],
    },
    {
      title: 'HTML & CSS',
      items: [
        {
          url: 'https://youtu.be/GVkNqiXwb9c',
          label: 'Introduction to HTML & CSS',
        },
        { url: 'https://youtu.be/J5FYdEsXTzA', label: 'HTML Structure' },
        { url: 'https://youtu.be/y6udZikvtus', label: 'CSS & Typography' },
        { url: 'https://youtu.be/_MncSiV2jEE', label: 'Exercise: HTML & CSS' },
        {
          url: 'https://youtu.be/FTEnYS_w5cQ',
          label: 'Exercise: CSS Box Model',
        },
        { url: 'https://youtu.be/yStOgz3GJRs', label: 'CSS Box Model' },
        {
          url: 'https://youtu.be/OOXdt4cOGzU',
          label: 'Exercise: Position & Grid',
        },
        { url: 'https://youtu.be/M1tYnxsHqZ8', label: 'Position & Grid' },
        { url: 'https://youtu.be/CvlqwoNQ9go', label: 'Exercise: Flexbox' },
        { url: 'https://youtu.be/hKcOsh24FvE', label: 'Flexbox' },
        { url: 'https://youtu.be/Tu_FaUzCZKs', label: 'Media Queries' },
        {
          url: 'https://youtu.be/w0wr4A6SzPo',
          label: 'Design to Code - Demo Project',
        },
        { url: 'https://youtu.be/BUOGlCMsJLA', label: 'Exam Preparation' },
      ],
    },
    {
      title: 'Tetris',
      items: [
        { url: 'https://www.youtube.com/watch?v=_-JyqwaLjVM', label: 'Part 1' },
        { url: 'https://www.youtube.com/watch?v=lWsm3ZTSnt0', label: 'Part 2' },
        { url: 'https://www.youtube.com/watch?v=VBxFekjsGPc', label: 'Part 3' },
        { url: 'https://youtu.be/SmDNHr3uL-E', label: 'Part 4' },
        { url: 'https://youtu.be/v2mEpgxSB6A', label: 'Part 5' },
        { url: 'https://youtu.be/IjO38LeZuHY', label: 'Part 6' },
      ],
    },
  ];

  constructor(private router: Router) {}

  back() {
    this.router.navigate(['/']);
  }

  get totalLinks(): number {
    return this.links.reduce((sum, section) => sum + section.items.length, 0);
  }
}
