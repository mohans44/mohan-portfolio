import feedFocus01 from '../assets/feedfocus/01.png';
import feedFocus02 from '../assets/feedfocus/02.png';
import feedFocus03 from '../assets/feedfocus/03.png';
import feedFocus04 from '../assets/feedfocus/04.png';
import gguUniPass01 from '../assets/gguunipass/01.png';
import gguUniPass02 from '../assets/gguunipass/02.png';
import gguUniPass03 from '../assets/gguunipass/03.png';
import jobFinder01 from '../assets/jobfinder/01.png';
import jobFinder02 from '../assets/jobfinder/02.png';
import jobFinder03 from '../assets/jobfinder/03.png';
import movieVault01 from '../assets/movievault/01.png';
import movieVault02 from '../assets/movievault/02.png';
import movieVault03 from '../assets/movievault/03.png';
import resumePdf from '../assets/mohan_resume_sde.pdf';

export const header = {
  name: "Mohan Seetha",
  title: "Full Stack Developer",
  socials: [
    {
      label: "GitHub",
      url: "https://github.com/mohans44",
      icon: "Github",
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/mohansseetha/",
      icon: "Linkedin",
    },
    {
      label: "Email",
      url: "mailto:mohansseetha@gmail.com",
      icon: "Mail",
    },
    {
      label: "Resume",
      url: resumePdf,
      icon: "FileText",
      isResume: true,
    },
  ],
};

export const bio = `
I am a final-year Computer Science (AI/ML) student who enjoys building software that is practical, scalable, and cleanly engineered. My core focus is full-stack development with React, Node.js, Express, Spring Boot, and modern data layers, and I like owning the full flow from product idea to shipped implementation. I have worked on systems ranging from high-volume news aggregation and recommendation engines to campus workflow automation used by real users every day. Across these builds, I consistently focus on performance, reliability, and developer-friendly architecture, whether that means improving API response paths, designing better data retrieval patterns, or simplifying complex user journeys. I am especially motivated by projects where strong engineering can directly remove friction for people, and I care deeply about writing maintainable code that scales with both usage and team growth.
`;

export const aboutKeyPoints = [
  "I built Feed Focus to process 10K+ daily articles from 150+ feeds, with topic-driven relevance and performance-first API design.",
  "I shipped Movie Vault as a full-stack product with personalized recommendations and optimization work for faster search and retrieval.",
  "I delivered campus automation tools during my internship, including hall-ticket and gate-pass workflows used by 2,000+ students.",
  "I enjoy building systems end-to-end: backend architecture, database modeling, API design, frontend UX, and deployment polish.",
  "I prioritize measurable engineering outcomes like lower latency, cleaner architecture, and simpler user workflows.",
  "My stack includes Python, Java, JavaScript, React, Node.js, Express, Spring Boot, MySQL, and MongoDB.",
  "I am currently completing B.Tech in CSE (AI/ML) with an 8.8 CGPA and strong fundamentals in DSA, OS, DBMS, CN, and ML.",
];

export const blogs = [
  {
    title: "Compilers and How They Work",
    summary:
      "A straightforward guide to what compilers do, how they turn code into programs, and why they’re a crucial part of the software we use every day.",
    link: "https://medium.com/@mohansseetha/compilers-and-how-they-work-a7f20f2e3061",
  },
  {
    title: "Designing a Robust Notification System",
    summary:
      "An in-depth exploration of the challenges and solutions in building a reliable notification system for messaging applications.",
    link: "https://medium.com/@mohansseetha/the-unsung-hero-of-messaging-apps-designing-a-robust-notification-system-c8ed97a357f5",
  },
];

export const education = [
  {
    degree: "B.Tech in Computer Science (AI & ML)",
    college: "Godavari Institute of Engineering and Technology",
    years: "2022 – 2026",
    cgpa: "8.8/10",
  },
];

export const experience = [
  {
    title: "Full Stack Development Intern",
    organization: "Godavari Institute of Engineering and Technology",
    duration: "Jan 2025 – Mar 2025",
    responsibilities: [
      "Automated Hall-Ticket generation using React & Flask that served 2,000+ students eliminating manual work.",
      "Developed a secure fee receipt parser to programmatically verify payments, ensuring 100% dues clearance.",
      "Digitized the campus Gate Pass process using React & Node.js, replacing manual paperwork with a real-time digital approval workflow.",
    ],
  },
];

export const work = [
  {
    name: "Movie Vault",
    desc: "Personalized movie journal with a recommendation engine. Handles 1M+ records with sub-second search latency.",
    keyPoint: "Recommendation engine tuned for fast, personal picks at scale.",
    github: "https://github.com/mohans44/movie-vault",
    live: "https://movie-vault-web.vercel.app/",
    tech: ["MERN Stack", "TailwindCSS", "Scikit-Learn"],
    featured: true,
    screenshots: [movieVault01, movieVault02, movieVault03],
  },
  {
    name: "Feed Focus",
    desc: "A high-scale news aggregator processing 10,000+ daily articles. Features real-time topic filtering and a highly optimized backend.",
    keyPoint: "Real-time topic filtering across 10,000+ articles every day.",
    github: "https://github.com/mohans44/feedfocus",
    live: "https://feedfocusnews.vercel.app/",
    tech: ["MERN Stack", "TailwindCSS", "Cloudfare Workers AI"],
    screenshots: [feedFocus01, feedFocus02, feedFocus03, feedFocus04],
  },
  {
    name: "Job Finder",
    desc: "Full-featured job portal with application tracking and role-based dashboards. Secure and responsive.",
    keyPoint: "Role-based dashboards with secure application tracking workflow.",
    github: "https://github.com/mohans44/job-finder",
    live: "https://job-finder-web.web.app/",
    tech: ["React", "Firebase", "Chakra UI"],
    screenshots: [jobFinder01, jobFinder02, jobFinder03],
  },
  {
    name: "GGU UniPass",
    desc: "Digital hall ticket system serving 1500+ students. Eliminated manual paperwork and streamlined exam entry.",
    keyPoint: "Paperless hall-ticket flow used by 1,500+ students on campus.",
    github: "https://github.com/giet-intern/giet-unipass",
    live: "https://giet-unipass.vercel.app/",
    tech: ["React", "Flask", "MongoDB"],
    screenshots: [gguUniPass01, gguUniPass02, gguUniPass03],
  },
];

export const skills = [
  {
    category: "Programming",
    items: [
      { name: "Python", icon: "SiPython" },
      { name: "Java", icon: "FaJava" },
      { name: "JavaScript", icon: "SiJavascript" },
      { name: "C++", icon: "SiCplusplus" },
    ],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      { name: "React", icon: "SiReact" },
      { name: "Node.js", icon: "SiNodedotjs" },
      { name: "Express", icon: "SiExpress" },
      { name: "Spring Boot", icon: "SiSpringboot" },
      { name: "PyTorch", icon: "SiPytorch" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "PostgreSQL", icon: "SiPostgresql" },
      { name: "MongoDB", icon: "SiMongodb" },
      { name: "MySQL", icon: "SiMysql" },
      { name: "Firebase", icon: "SiFirebase" },
    ],
  },
  {
    category: "Dev Tools",
    items: [
      { name: "Docker", icon: "SiDocker" },
      { name: "AWS", icon: "SiAmazonwebservices" },
      { name: "Git", icon: "SiGit" },
      { name: "Postman", icon: "SiPostman" },
    ],
  },
];
