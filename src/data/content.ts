import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiSass,
  SiGreensock,
  SiGit,
  SiVercel,
  SiStrapi,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { SiFramer } from "react-icons/si";
import type { IconType } from "react-icons";

//  Projects
export type Project = {
  title: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
};

export type SkillItem = {
  name: string;
  icon: IconType;
};

export type Skill = {
  category: string;
  items: SkillItem[];
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  points: string[];
};

// Personal
export const personal = {
  name: "Muzamil Baig",
  role: "Frontend Web Developer",
  tagline:
    "I turn ideas into fast, production-ready websites. From multilingual platforms to animation-rich interfaces, I care about the details that make products feel effortless.",
  about:
    "Frontend developer with hands-on experience building multilingual, animation-rich, production websites using React, Next.js, and TypeScript. I focus on clean architecture, performance, and smooth user experiences.",
  github: "https://github.com/muzamilbaig123",
  linkedin: "https://www.linkedin.com/in/muzamil-baig-b42467301/",
  email: "muzamilbaig24@gmail.com",
};

//  Skills
export const skills: Skill[] = [
  {
    category: "Frontend",
    items: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
    ],
  },
  {
    category: "Styling & Animation",
    items: [
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "SCSS", icon: SiSass },
      { name: "GSAP", icon: SiGreensock },
      { name: "Framer Motion", icon: SiFramer },
    ],
  },
  {
    category: "Tools & More",
    items: [
      { name: "Git", icon: SiGit },
      { name: "Vercel", icon: SiVercel },
      { name: "Strapi", icon: SiStrapi },
      { name: "REST APIs", icon: TbApi },
    ],
  },
];

export const projects: Project[] = [
  {
    title: "MM Computers",
    description:
      "My personal e-commerce style website for a computer hardware business.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/projects/project1.png",
    link: "https://mmcomputers.pk/",
  },
  {
    title: "Sheryians Task 1",
    description:
      "A responsive landing page built as part of the Sheryians coding challenge.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/projects/project2.png",
    link: "https://task1sheryians.netlify.app/",
  },
  {
    title: "Animated Landing",
    description:
      "An animation-focused landing page exploring smooth interactions.",
    tech: ["HTML", "CSS", "GSAP"],
    image: "/projects/project3.png",
    link: "https://grand-squirrel-fd525f.netlify.app/",
  },
  {
    title: "Creative Page",
    description: "A modern, creative web page with clean layout and motion.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/projects/project4.png",
    link: "https://jolly-capybara-5d3724.netlify.app/",
  },
  {
    title: "UI Concept",
    description: "A polished UI concept focusing on layout and responsiveness.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/projects/project5.png",
    link: "https://wonderful-paletas-b50dd2.netlify.app/",
  },
  {
    title: "Interactive Web",
    description:
      "An interactive web page experimenting with modern web techniques.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/projects/project6.png",
    link: "https://poetic-macaron-7a25e0.netlify.app/",
  },
];
//  Experience
export const experience: ExperienceItem[] = [
  {
    role: "Frontend Web Developer",
    company: "RealCore Solutions",
    period: "2025 Present",
    points: [
      "Built and shipped multiple production client websites using React, Next.js, and TypeScript.",
      "Implemented complex UI, GSAP animations, RTL/i18n support, and CMS integrations.",
      "Optimized performance and collaborated with backend and design teams.",
    ],
  },
];
