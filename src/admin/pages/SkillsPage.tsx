// ============================================================
// admin/pages/SkillsPage.tsx
// Skills manage karna (CrudPage ki config).
// ============================================================

import { FiZap } from "react-icons/fi";
import { skillsApi } from "../../api/admin";
import type { ApiSkill, SkillInput } from "../../api/types";
import { getSkillIcon } from "../../data/skillIcons";
import CrudPage, { type ColumnConfig, type FieldConfig } from "./CrudPage";

const fields: FieldConfig<ApiSkill>[] = [
  {
    name: "name",
    label: "Name",
    required: true,
    maxLength: 100,
    placeholder: "React",
    hint: "Icon is picked automatically from the name (unknown names get a default icon).",
  },
  {
    name: "category",
    label: "Category",
    required: true,
    maxLength: 100,
    placeholder: "Frontend",
    // Pehle se bani categories dropdown me, taake spelling same rahe
    // (public site pe same category wali skills ek group me dikhti hain)
    getSuggestions: (items) => [...new Set(items.map((s) => s.category))],
  },
];

const columns: ColumnConfig<ApiSkill>[] = [
  {
    header: "Skill",
    render: (s) => {
      const Icon = getSkillIcon(s.name);
      return (
        <span className="flex items-center gap-3 font-medium text-white">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-neutral-800 bg-neutral-900">
            <Icon className="text-base text-neutral-400" aria-hidden />
          </span>
          {s.name}
        </span>
      );
    },
  },
  {
    header: "Category",
    render: (s) => (
      <span className="rounded-full border border-neutral-800 px-2.5 py-0.5 text-xs text-neutral-400">{s.category}</span>
    ),
  },
];

export default function SkillsPage() {
  return (
    <CrudPage<ApiSkill, SkillInput>
      title="Skills"
      singular="skill"
      description="Grouped by category on your site. Use the same category name to keep skills together."
      icon={FiZap}
      api={skillsApi}
      fields={fields}
      columns={columns}
      itemLabel={(s) => s.name}
      toForm={(s) => ({ name: s.name, category: s.category })}
      toInput={(v) => ({ name: v.name.trim(), category: v.category.trim() })}
    />
  );
}
