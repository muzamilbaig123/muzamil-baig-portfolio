// ============================================================
// api/types.ts
// Backend jo JSON bhejta hai uski exact shape (DB column names, snake_case).
// Admin panel isi shape ke saath kaam karta hai.
// ============================================================

export type ApiProject = {
  id: number;
  title: string;
  description: string | null;
  tech: string[] | string | null; // backend array bhejta hai, lekin string bhi handle karte hain
  image_url: string | null;
  project_link: string | null;
  created_at: string;
};

export type ApiSkill = {
  id: number;
  name: string;
  category: string;
};

export type ApiExperience = {
  id: number;
  role: string;
  company: string;
  duration: string | null;
  description: string | null; // har point nayi line pe
};

export type ApiMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

// Create/update ke waqt bheja jane wala data (id aur created_at server banata hai)
export type ProjectInput = {
  title: string;
  description: string;
  tech: string; // "React, GSAP": backend khud split kar leta hai
  image_url: string;
  project_link: string;
};
export type SkillInput = Omit<ApiSkill, "id">;
export type ExperienceInput = { role: string; company: string; duration: string; description: string };
export type MessageInput = { name: string; email: string; message: string };
