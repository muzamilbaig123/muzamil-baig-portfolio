// ============================================================
// admin/pages/ExperiencePage.tsx
// Experience manage karna (CrudPage ki config).
// Description textarea me har point nayi line pe likho,
// public site har line ko alag bullet point dikhati hai.
// ============================================================

import { FiBriefcase } from "react-icons/fi";
import { experienceApi } from "../../api/admin";
import type { ApiExperience, ExperienceInput } from "../../api/types";
import CrudPage, { type ColumnConfig, type FieldConfig } from "./CrudPage";

const fields: FieldConfig<ApiExperience>[] = [
  { name: "role", label: "Role", required: true, maxLength: 150, placeholder: "Frontend Web Developer" },
  { name: "company", label: "Company", required: true, maxLength: 150, placeholder: "RealCore Solutions" },
  { name: "duration", label: "Duration", maxLength: 100, placeholder: "2025 - Present" },
  {
    name: "description",
    label: "Points",
    type: "textarea",
    placeholder: "Built production websites...\nImplemented GSAP animations...",
    hint: "One point per line.",
  },
];

const columns: ColumnConfig<ApiExperience>[] = [
  {
    header: "Role",
    render: (e) => (
      <div className="min-w-0">
        <p className="truncate font-medium text-white">{e.role}</p>
        <p className="truncate text-xs text-neutral-500">{e.company}</p>
      </div>
    ),
  },
  { header: "Duration", render: (e) => e.duration || "–", className: "whitespace-nowrap text-neutral-400" },
  {
    header: "Points",
    // Kitne points hain (khaali lines nahi ginte)
    render: (e) => (
      <span className="tabular-nums">{(e.description ?? "").split("\n").filter((l) => l.trim()).length}</span>
    ),
    className: "text-neutral-400",
  },
];

export default function ExperiencePage() {
  return (
    <CrudPage<ApiExperience, ExperienceInput>
      title="Experience"
      singular="experience"
      description="Your work history. Each line in Points becomes a bullet on the site."
      icon={FiBriefcase}
      api={experienceApi}
      fields={fields}
      columns={columns}
      itemLabel={(e) => `${e.role} at ${e.company}`}
      toForm={(e) => ({
        role: e.role,
        company: e.company,
        duration: e.duration ?? "",
        description: e.description ?? "",
      })}
      toInput={(v) => ({
        role: v.role.trim(),
        company: v.company.trim(),
        duration: v.duration.trim(),
        // Har line trim, khaali lines hata do
        description: v.description
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean)
          .join("\n"),
      })}
    />
  );
}
