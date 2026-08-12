import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiSass,
  SiGreensock,
  SiFramer,
  SiGit,
  SiVercel,
  SiStrapi,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import type { IconType } from "react-icons";

// Types
export type Project = {
  title: string;
  description: string;
  tech: string[];
  link?: string;
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
//  Projects
export const projects: Project[] = [
  {
    title: "RealCore Solutions",
    description:
      "Large multilingual (EN/AR/UR) corporate website with RTL support, dynamic careers module, and CMS-driven content.",
    tech: ["Next.js", "TypeScript", "Tailwind", "next-intl", "Strapi"],
    link: "https://realcoresolutions.com",
  },
  {
    title: "FinCodev",
    description:
      "Fintech-style marketing website with GSAP scroll animations, secure contact form, and smooth micro-interactions.",
    tech: ["Next.js", "GSAP", "Tailwind", "Nodemailer"],
    link: "",
  },
  {
    title: "Silicon IT Solutions",
    description:
      "Fast, SEO-friendly static business website with Meta Pixel integration and aggressive mobile speed optimization.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "",
  },
  {
    title: "iaximo CRM",
    description:
      "Role-based CRM admin panel deployed on a Linux VPS with CI/CD, SSL, and permission-based access control.",
    tech: ["Laravel", "Filament", "MySQL", "Nginx"],
    link: "",
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
