// ============================================================
// data/skillIcons.ts
// DB me sirf skill ka naam hota hai, icon nahi.
// Ye map naam se react-icons ka icon dhoondta hai.
// Admin panel se nayi skill add karo aur uska icon yahan na ho to FiCode dikhega.
// ============================================================

import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiSass,
  SiGreensock,
  SiGit,
  SiGithub,
  SiVercel,
  SiStrapi,
  SiFramer,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiBootstrap,
  SiFigma,
  SiVite,
  SiRedux,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { FiCode } from "react-icons/fi";

// Key = naam lowercase aur sirf letters/numbers ("Next.js" -> "nextjs", "Tailwind CSS" -> "tailwindcss")
const ICONS: Record<string, IconType> = {
  react: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  tailwindcss: SiTailwindcss,
  tailwind: SiTailwindcss,
  scss: SiSass,
  sass: SiSass,
  gsap: SiGreensock,
  framermotion: SiFramer,
  git: SiGit,
  github: SiGithub,
  vercel: SiVercel,
  strapi: SiStrapi,
  restapis: TbApi,
  restapi: TbApi,
  html: SiHtml5,
  html5: SiHtml5,
  css: SiCss,
  css3: SiCss,
  nodejs: SiNodedotjs,
  node: SiNodedotjs,
  express: SiExpress,
  expressjs: SiExpress,
  mysql: SiMysql,
  mongodb: SiMongodb,
  bootstrap: SiBootstrap,
  figma: SiFigma,
  vite: SiVite,
  redux: SiRedux,
};

export function getSkillIcon(name: string): IconType {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  return ICONS[key] ?? FiCode;
}
