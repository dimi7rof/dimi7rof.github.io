interface Link {
  id: string;
  label: string;
}
export interface Course {
  title: string;
  links: Link[];
}

export const links: Course[] = [
  {
    title: 'C# Fundamentals',
    links: [
      {
        id: 'qEIy8xEhJTg',
        label: 'Resources',
      },
      { id: 'qqBXjHqSWzI', label: 'IT Talks' },
      {
        id: 'YRJBYfxny4U',
        label: 'Exercise: Data Types and Variables',
      },
      {
        id: '1YS1h0ENek0',
        label: 'Data Types and Variables',
      },
      {
        id: 'jpwilEUyTn8?t=1822',
        label: 'HTML and CSS Basics',
      },
      {
        id: 'mPOkDntXyfg',
        label: 'Exercise: Arrays',
      },
      {
        id: 'x79iDXGOlyc?t=1620',
        label: 'Arrays',
      },
      {
        id: 'ee0UAfrsLAM',
        label: 'Software Dev. Concepts - Part 1',
      },
      {
        id: 'Big7LzbpEkQ',
        label: 'Exercise: Methods',
      },
      { id: 'y6KXzRzZpKE', label: 'Methods' },
      {
        id: 'X3I9kfE8Qps',
        label: 'Software Dev. Concepts - 2 (S.Nakov)',
      },
      {
        id: 'iYzMbb01IA4',
        label: 'Exercise:Lists',
      },
      { id: 'VGq1e1BOdmA', label: 'Lists' },
      {
        id: 'iu7PUPrQKSk',
        label: 'Exam Preparation',
      },
      {
        id: 's3-9PhsEVjg',
        label: 'Exercise: Objects and Classes',
      },
      {
        id: 'O6HPBOoCwwg',
        label: 'Objects and Classes',
      },
      {
        id: 'clytLKNJehQ',
        label: 'Bitwise Operations',
      },
      {
        id: '1XaSaPu6MH4',
        label: 'Exercise: Associative Arrays',
      },
      {
        id: '2UJp1oiltPY',
        label: 'Associative Arrays',
      },
      {
        id: 'm41wRY2zDVk',
        label: 'Problem Solving',
      },
      {
        id: 'Tj4NfZjrJi4',
        label: 'Exercise: Text Processing',
      },
      {
        id: 'dTkrTaDv1o4',
        label: 'Text Processing',
      },
      {
        id: 'R8fpoq2B7Lg',
        label: 'Database Basics',
      },
      {
        id: 'jYRVln5uokw',
        label: 'Exercise: Regular Expressions',
      },
      {
        id: 'M0C9PRiUluo',
        label: 'Regular Expressions',
      },
      {
        id: 'f2IU8VtKOg4',
        label: 'Git and GitHub',
      },
      {
        id: 'YncEYyhGD7s',
        label: 'Exam Preparation 2',
      },
      {
        id: 'nKfg0xiPYIU',
        label: 'Exam Preparation 1',
      },
      {
        id: 'v7QRcBbO32Y',
        label: 'QA Introduction',
      },
      {
        id: 'Swm4iEfxkRU',
        label: 'Basic Web Project',
      },
    ],
  },
  {
    title: 'C# OOP',
    links: [
      {
        id: 'xqXUUiYFb2c',
        label: 'Exercise: Inheritance',
      },
      { id: 'mNYxFLyiWQs', label: 'Inheritance' },
      { id: 'j8NArvbylnA', label: 'Exercise: Encapsulation' },
      {
        id: '4Vf0bp2DCQQ',
        label: 'Encapsulation',
      },
      {
        id: 'oolvmuYqYY4',
        label: 'Exercise: Interfaces and Abstraction',
      },
      {
        id: 'vR88YOKGzoI',
        label: 'Interfaces and Abstraction',
      },
      { id: 'CW2aTx5G1Yg', label: 'Exercise: Polymorphism' },
      {
        id: 'CW2aTx5G1Yg',
        label: 'Polymorphism',
      },
      { id: 'GouvhhzvOWg', label: 'Exception Handling' },
      { id: 'xz6HIHgUtVU', label: 'Debugging Techniques' },
      { id: 'tVEY7kcQ7JE', label: 'Exercise: SOLID' },
      { id: 'W3jzsCWXkbw', label: 'SOLID' },
      {
        id: 'CFm_qL-lhdc',
        label: 'Exercise: Reflection and Attributes',
      },
      {
        id: 'ERofkjV12PM',
        label: 'Reflection and Attributes',
      },
      { id: 'pBRW0BG6hi8', label: 'Exercise: Unit Testing' },
      { id: 'D6AXSAsKxxM', label: 'Unit Testing' },
      {
        id: '5xBsp6wd7aU',
        label: 'Exercise: Mocking and Test Driven Development',
      },
      {
        id: 'uA17rRihQz0',
        label: 'Mocking and Test Driven Development',
      },
      {
        id: '8OXH5h9lQeg',
        label: 'Exercise: Design Patterns',
      },
      { id: 'wyVeGKRCmJw', label: 'Design Patterns' },
      { id: '1MN8kjw7P24', label: 'Workshop' },
      { id: 'epMljGtkTDE', label: 'Workshop 2' },
      { id: 'pCCHojcAh7g', label: 'Exam Preparation' },
      { id: 'zbeEGjcWvDs', label: 'Exam Preparation 2' },
      { id: 'DXfaidRPF4', label: 'Q&A Session' },
    ],
  },
  {
    title: 'C# Advanced',
    links: [
      {
        id: '5gN7onLn0xU',
        label: 'Course Introduction',
      },
      { id: 'ahJNFgbcbc8', label: 'Exercise' },
      {
        id: '0DNCQRisf',
        label: 'Stacks and Queues',
      },
      { id: 'rNr4KTwKwk8', label: 'Exercise' },
      { id: '3dVoFMcC2qE', label: 'Multidimensional Arrays' },
      { id: 'xcJPwhcPNHc', label: 'Exercise' },
      {
        id: 'xSFlKL5FZi8',
        label: 'Sets and Dictionaries Advanced',
      },
      { id: 'wl_qSDbUil8', label: 'Exercise' },
      {
        id: 'ulFLjTqEciA',
        label: 'Streams, Files and Directories',
      },
      { id: 'kGT5xX4Vvu4', label: 'Exercise' },
      { id: 'hEwSqJdZp9Y', label: 'Functional Programming' },
      { id: 'pd_6ElH6B78', label: 'Exercise' },
      { id: '2NAUIxo3bJA', label: 'Defining classes' },
      {
        id: 'bMlZo2XXcBE',
        label: 'Implementing Linked List',
      },
      {
        id: 'mQwzT9cMfTA',
        label: 'Implementing Stack and Queue',
      },
      { id: 'I4R3BnjDR0M', label: 'Exercise' },
      { id: 'BXyFCyfgYqk', label: 'Generics' },
      { id: '75wvJHW6N9A', label: 'Exercise' },
      {
        id: 'raKE0ABuWOo',
        label: 'Iterators and Comparators',
      },
      {
        id: 'eMqrCwiRWZ8',
        label: 'Exam Preparation 1.1',
      },
      { id: '4ZSxohofwTA', label: 'Exam Preparation 1.2' },
      { id: 'CXNnpvtwn14', label: 'Exam Preparation2' },
      { id: '2dm3omhRlag', label: 'Algorithms Introduction' },
    ],
  },
  {
    title: 'MSSQL',
    links: [
      {
        id: 'eXORxoifLsA',
        label: 'Exercise: Databases Introduction',
      },
      { id: '4uwArOTPlyQ', label: 'Databases Introduction' },
      { id: 't9c99o85qO0', label: 'Exercise: CRUD' },
      { id: 'QYEeddOCe4U', label: 'CRUD' },
      {
        id: 'vxoCxg6iZoA',
        label: 'Exercise: Table Relations',
      },
      { id: 'U7tTwG0rdGk', label: 'Table Relations' },
      {
        id: 'lTcVkQcPbK4',
        label: 'Exercise: Built-in Functions',
      },
      { id: 'WO5L-QIJs8A', label: 'Built-in Functions' },
      {
        id: 'wvgXDwuJPZw',
        label: 'Exercise: Subqueries and Joins',
      },
      { id: 'hEEcqb3dtDg', label: 'Subqueries and Joins' },
      {
        id: 'dgfbxPcm_KE',
        label: 'Exercise: Indices and Data Aggregation',
      },
      {
        id: 'bKfYTmtqJ_w',
        label: 'Indices and Data Aggregation',
      },
      {
        id: 'p0vo1OPVbHE',
        label: 'Exercise: Functions and Procedures',
      },
      {
        id: 'p0vo1OPVbHE',
        label: 'Exercise: Functions and Procedures',
      },
      {
        id: '74OjdxPS0lk',
        label: 'Functions and Procedures',
      },
      {
        id: 'mYJOHmUZEk8',
        label: 'Triggers and Transactions',
      },
      { id: 'EtxiCbl2aXM', label: 'Exam Preparation' },
      { id: 'CKJuqFM3H_c', label: 'Exam Preparation 2' },
    ],
  },
  {
    title: 'EntityFramework Core',
    links: [
      { id: 'eOcwBL3MUD8', label: 'Exercise: ADO.NET' },
      { id: 'CM-WA6I2J-o', label: 'ADO.NET' },
      {
        id: 'ZGym70dIHo0',
        label: 'Exercise: ORM Fundamentals',
      },
      { id: '63WO4A7TRhY', label: 'ORM Fundamentals' },
      {
        id: 'B5IDAcsXvaI',
        label: 'Exercise: Entity Framework Introduction',
      },
      {
        id: 'FV_AlWkEyK0',
        label: 'Entity Framework Introduction',
      },
      {
        id: 'tZg2kz4d4qs',
        label: 'Exercise: Entity Relations',
      },
      { id: 'wgE45bUz4mE', label: 'Entity Relations' },
      { id: 'Hnz76IBAfOk', label: 'Exercise: LINQ' },
      { id: '_sO7dNDts3s', label: 'LINQ' },
      {
        id: 'QWZxnhYMoVU',
        label: 'Exercise: Advanced Querying',
      },
      { id: 'nYmjgsPNzX8', label: 'Advanced Querying' },
      {
        id: 'sl0V73si3PI',
        label: 'Exercise: C# Auto Mapping Objects',
      },
      { id: 'qVBdRNtGrv0', label: 'C# Auto Mapping Objects' },
      {
        id: 'yBEJKYsK8VE',
        label: 'Exercise: JSON Processing',
      },
      { id: 'u13fDCMboUM', label: 'JSON Processing' },
      {
        id: 'd9sXFUzij-Y',
        label: 'Exercise: XML Processing',
      },
      { id: 'Gz8JJ-MxntY', label: 'XML Processing' },
      {
        id: 'Yocjk4eyvks',
        label: 'Exercise: Best Practices And Architecture',
      },
      {
        id: 'Eh4QD7XQys8',
        label: 'Best Practices And Architecture',
      },
      { id: 'dlvN-A_KjO8', label: 'Workshop' },
      { id: 'DFUBE58yrrY', label: 'Workshop' },
      { id: 'z_cYMKyNMlE', label: 'NoSQL' },
      { id: 'fbp82mE27_s', label: 'Exam Preparation 1' },
      { id: 'KhvaAzFCRX0', label: 'Exam Preparation 2' },
      { id: 'W9Clq1nF8ak', label: 'Exam Preparation' },
    ],
  },
  {
    title: 'ASP.NET',
    links: [
      {
        id: 'f0sqOnKwIMg',
        label: 'Web Server - HTTP Protocol',
      },
      {
        id: '6ibb0RHTO8k',
        label: 'Web Server - Asynchronous Processing',
      },
      {
        id: 'rGFb9OJXJpw',
        label: 'Web Server - State Management',
      },
      { id: 'YPiuv8sljlY', label: 'Workshop' },
      { id: 'PDvQOQ42jaI', label: 'MVC Introduction' },
      { id: 'MTzJ0as3RBo', label: 'CONSULTING DAY' },
      {
        id: 'jy4owq-aR3g',
        label: 'MVC Advanced - View Engine',
      },
      { id: 'Hri4BW3o6w8', label: 'Workshop' },
      {
        id: 'DO_H4eLIwGA',
        label: 'MVC Advanced - IoC and Data Binding',
      },
      { id: 'CItncWowEPY', label: 'Workshop' },
      { id: 'qypRqBfxVeE', label: 'Exam Preparation' },
    ],
  },
  {
    title: 'HTML & CSS',
    links: [
      {
        id: 'GVkNqiXwb9c',
        label: 'Introduction to HTML & CSS',
      },
      { id: 'J5FYdEsXTzA', label: 'HTML Structure' },
      { id: 'y6udZikvtus', label: 'CSS & Typography' },
      { id: '_MncSiV2jEE', label: 'Exercise: HTML & CSS' },
      { id: 'FTEnYS_w5cQ', label: 'Exercise: CSS Box Model' },
      { id: 'yStOgz3GJRs', label: 'CSS Box Model' },
      {
        id: 'OOXdt4cOGzU',
        label: 'Exercise: Position & Grid',
      },
      { id: 'M1tYnxsHqZ8', label: 'Position & Grid' },
      { id: 'CvlqwoNQ9go', label: 'Exercise: Flexbox' },
      { id: 'hKcOsh24FvE', label: 'Flexbox' },
      { id: 'Tu_FaUzCZKs', label: 'Media Queries' },
      {
        id: 'w0wr4A6SzPo',
        label: 'Design to Code - Demo Project',
      },
      { id: 'BUOGlCMsJLA', label: 'Exam Preparation' },
    ],
  },
  {
    title: 'Additionals',
    links: [
      { id: 'TewMxkTddQk', label: 'Introduction to HTML' },
      {
        id: '25Fj5iMRFIg',
        label: 'Introduction to CSS',
      },
      {
        id: 'KrTMzYhpo3E',
        label: 'C# Masterclass - C# Tips and Tricks',
      },
      {
        id: 'saKCqoBwUTg',
        label: 'Custom unit testing framework',
      },
      {
        id: '9tutJrjpRd0',
        label: 'Text Processing and Regular Expressions',
      },
      {
        id: 'Ob2uN8XdQmY',
        label: 'C# Advanced - Functional Programming',
      },
      { id: 'LkWis2vrUIE', label: 'Reflection Masterclass' },
      {
        id: 'Fcj2tyRk-8w',
        label: 'Working with Abstraction',
      },
      {
        id: 'KIKbqh7UEos',
        label:
          'Recursion Introduction. All paths in a Labyrinth. Eight queens problem.',
      },
      { id: 'n60kNS09ZDs', label: 'Git and GitHub' },
    ],
  },
  {
    title: 'Tetris',
    links: [
      { id: '_-JyqwaLjVM', label: 'Part 1' },
      { id: 'lWsm3ZTSnt0', label: 'Part 2' },
      { id: 'VBxFekjsGPc', label: 'Part 3' },
      { id: 'SmDNHr3uL-E', label: 'Part 4' },
      { id: 'v2mEpgxSB6A', label: 'Part 5' },
      { id: 'IjO38LeZuHY', label: 'Part 6' },
    ],
  },
];
