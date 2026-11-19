// ============================================================
// api/portfolio.ts
// Public site ke API calls. Har function backend ka data laata hai
// aur usay frontend ke types (types/portfolio.ts) me convert karta hai.
// ============================================================

import { api } from "./client";
import type { ApiExperience, ApiProject, ApiSkill, MessageInput } from "./types";
import type { ExperienceItem, Project, Skill } from "../types/portfolio";
import { getSkillIcon } from "../data/skillIcons";

/** tech array ho ya "React, GSAP" string, hamesha saaf array banao */
function toTechArray(tech: ApiProject["tech"]): string[] {
  if (!tech) return [];
  const list = Array.isArray(tech) ? tech : tech.split(",");
  return list.map((t) => t.trim()).filter(Boolean);
}

/** API project -> frontend Project (image_url -> image, project_link -> link) */
export function mapProject(p: ApiProject): Project {
  return {
    id: p.id,
    title: p.title,
    description: p.description ?? "",
    tech: toTechArray(p.tech),
    image: p.image_url ?? "",
    link: p.project_link ?? "",
  };
}

/** API experience -> frontend ExperienceItem (description ki har line ek point) */
export function mapExperience(e: ApiExperience): ExperienceItem {
  return {
    id: e.id,
    role: e.role,
    company: e.company,
    period: e.duration ?? "",
    points: (e.description ?? "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean), // khaali lines hata do
  };
}

/**
 * API skills (flat list) -> categories me grouped
 *   [{name:"React", category:"Frontend"}, {name:"Git", category:"Tools"}]
 *   -> [{category:"Frontend", items:[React]}, {category:"Tools", items:[Git]}]
 * Categories usi order me rehti hain jis me API se aayi.
 */
export function groupSkills(list: ApiSkill[]): Skill[] {
  const groups = new Map<string, Skill>();
  for (const s of list) {
    if (!groups.has(s.category)) {
      groups.set(s.category, { category: s.category, items: [] });
    }
    groups.get(s.category)!.items.push({ id: s.id, name: s.name, icon: getSkillIcon(s.name) });
  }
  return [...groups.values()];
}

// ---- API calls ----

export async function fetchProjects(): Promise<Project[]> {
  const { data } = await api.get<ApiProject[]>("/projects");
  return data.map(mapProject);
}

export async function fetchSkills(): Promise<Skill[]> {
  const { data } = await api.get<ApiSkill[]>("/skills");
  return groupSkills(data);
}

export async function fetchExperience(): Promise<ExperienceItem[]> {
  const { data } = await api.get<ApiExperience[]>("/experience");
  return data.map(mapExperience);
}

/** Contact form. Validation fail ho to backend 400 + { errors } bhejta hai. */
export async function sendMessage(input: MessageInput): Promise<void> {
  await api.post("/messages", input);
}
