// ============================================================
// types/portfolio.ts
// Public site ke components jo data shape use karte hain.
// API ka data (api/types.ts) pehle in shapes me convert hota hai (api/portfolio.ts).
// ============================================================

import type { IconType } from "react-icons";

export type Project = {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string; // API: image_url  ("" agar nahi hai)
  link: string; // API: project_link ("" agar nahi hai)
};

export type SkillItem = {
  id: number;
  name: string;
  icon: IconType; // DB me icon nahi hota, naam se dhoonda jata hai (data/skillIcons.ts)
};

// Ek category ki saari skills, e.g. { category: "Frontend", items: [React, Next.js] }
export type Skill = {
  category: string;
  items: SkillItem[];
};

export type ExperienceItem = {
  id: number;
  role: string;
  company: string;
  period: string; // API: duration
  points: string[]; // API: description, "\n" pe split
};
