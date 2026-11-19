// ============================================================
// admin/pages/ProjectsPage.tsx
// Projects manage karna. Saara form/list logic CrudPage me hai,
// yahan sirf projects ki config hai.
// ============================================================

import { FiFolder } from "react-icons/fi";
import { projectsApi } from "../../api/admin";
import type { ApiProject, ProjectInput } from "../../api/types";
import CrudPage, { type ColumnConfig, type FieldConfig } from "./CrudPage";

/** Link http:// ya https:// se shuru hona chahiye */
function validateUrl(value: string) {
  return /^https?:\/\/\S+$/i.test(value) ? undefined : "Must start with http:// or https://";
}

/** Image public folder ka path ("/projects/x.png") ya poora URL ho sakta hai */
function validateImage(value: string) {
  return /^(\/\S*|https?:\/\/\S+)$/i.test(value)
    ? undefined
    : 'Use a path like "/projects/image.png" or a full https:// URL';
}

/** tech string ho ya array, form ke liye "React, GSAP" string */
function techToText(tech: ApiProject["tech"]): string {
  if (!tech) return "";
  return Array.isArray(tech) ? tech.join(", ") : tech;
}

const fields: FieldConfig<ApiProject>[] = [
  { name: "title", label: "Title", required: true, maxLength: 150, placeholder: "MM Computers" },
  { name: "description", label: "Description", type: "textarea", placeholder: "What is this project about?" },
  {
    name: "tech",
    label: "Tech stack",
    placeholder: "React, TypeScript, GSAP",
    hint: "Comma-separated",
  },
  {
    name: "image_url",
    label: "Image URL",
    maxLength: 500,
    placeholder: "/projects/project1.png",
    validate: validateImage,
  },
  {
    name: "project_link",
    label: "Project link",
    maxLength: 500,
    placeholder: "https://example.com",
    validate: validateUrl,
  },
];

const columns: ColumnConfig<ApiProject>[] = [
  {
    header: "Project",
    // Thumbnail + title + link ek saath (mobile card me bhi yahi title banta hai)
    render: (p) => (
      <div className="flex min-w-0 items-center gap-4">
        {p.image_url ? (
          <img
            src={p.image_url}
            alt=""
            loading="lazy"
            className="h-11 w-16 shrink-0 rounded-lg border border-neutral-800 bg-neutral-900 object-cover object-top"
          />
        ) : (
          <div className="grid h-11 w-16 shrink-0 place-items-center rounded-lg border border-neutral-800 bg-neutral-900 text-sm font-semibold text-neutral-600">
            {p.title.charAt(0)}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate font-medium text-white">{p.title}</p>
          {p.project_link && (
            <a
              href={p.project_link}
              target="_blank"
              rel="noopener noreferrer"
              className="block max-w-[16rem] truncate text-xs text-neutral-500 transition hover:text-neutral-200"
            >
              {p.project_link.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </a>
          )}
        </div>
      </div>
    ),
  },
  {
    header: "Tech",
    render: (p) => {
      const list = techToText(p.tech).split(",").map((t) => t.trim()).filter(Boolean);
      return list.length ? (
        <div className="flex flex-wrap gap-1.5">
          {list.map((t) => (
            <span key={t} className="rounded-full border border-neutral-800 px-2.5 py-0.5 text-xs text-neutral-400">
              {t}
            </span>
          ))}
        </div>
      ) : (
        <span className="text-neutral-600">–</span>
      );
    },
  },
];

export default function ProjectsPage() {
  return (
    <CrudPage<ApiProject, ProjectInput>
      title="Projects"
      singular="project"
      description="The work shown in the Selected work section of your site."
      icon={FiFolder}
      api={projectsApi}
      fields={fields}
      columns={columns}
      itemLabel={(p) => p.title}
      // API item -> form values
      toForm={(p) => ({
        title: p.title,
        description: p.description ?? "",
        tech: techToText(p.tech),
        image_url: p.image_url ?? "",
        project_link: p.project_link ?? "",
      })}
      // form values -> API (backend tech string ko khud array bana leta hai)
      toInput={(v) => ({
        title: v.title.trim(),
        description: v.description.trim(),
        tech: v.tech.trim(),
        image_url: v.image_url.trim(),
        project_link: v.project_link.trim(),
      })}
    />
  );
}
