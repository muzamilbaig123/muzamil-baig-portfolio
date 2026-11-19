import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import type { Project } from "../types/portfolio";
import { fetchProjects } from "../api/portfolio";
import { useFetch } from "../hooks/useFetch";
import SectionStatus from "./SectionStatus";
import SectionHeader from "./SectionHeader";
import { ProjectsSkeleton } from "./Skeletons";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import { btnPrimary, iconBtn, section } from "../styles/ui";

export default function Projects() {
  const container = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Project | null>(null);

  // Projects API se (GET /api/projects)
  const { data: projects, loading, error, reload } = useFetch(fetchProjects);

  // Data aane se section ki height badalti hai, to neeche wale sections ke
  // scroll animations ki positions dobara calculate karo
  useEffect(() => {
    if (projects) ScrollTrigger.refresh();
  }, [projects]);

  return (
    <section ref={container} id="projects" className={section}>
      <SectionHeader eyebrow="Projects" title="Selected work" />

      <SectionStatus
        loading={loading}
        error={error}
        isEmpty={projects?.length === 0}
        emptyText="No projects yet."
        onRetry={reload}
        skeleton={<ProjectsSkeleton />}
        label="projects"
      />

      <div className="grid gap-6 md:grid-cols-2">
        {projects?.map((project) => (
          <button
            key={project.id}
            onClick={() => setActive(project)}
            className="project-card group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 text-left transition duration-300 ease-out hover:-translate-y-1 hover:border-neutral-600 hover:bg-neutral-900/70"
          >
            {/* Fixed ratio: sab cards ki image area same height */}
            <div className="aspect-video w-full overflow-hidden border-b border-neutral-800 bg-neutral-900">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              ) : (
                // Image na ho to title ka pehla harf
                <div className="grid h-full w-full place-items-center text-5xl font-semibold text-neutral-800">
                  {project.title.charAt(0)}
                </div>
              )}
            </div>

            <div className="flex w-full flex-1 items-center justify-between gap-4 p-5 md:p-6">
              <div className="min-w-0">
                <h3 className="truncate text-lg font-semibold text-white md:text-xl">
                  {project.title}
                </h3>
                {/* Tech na ho to bhi line ki jagah rahe, taake cards ki height same rahe */}
                <p className="mt-1 truncate text-sm text-neutral-500">
                  {project.tech.length ? project.tech.join(" · ") : " "}
                </p>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-neutral-800 text-neutral-500 transition duration-300 group-hover:border-neutral-500 group-hover:bg-white group-hover:text-neutral-950">
                <FiArrowUpRight aria-hidden />
              </span>
            </div>
          </button>
        ))}
      </div>

      {active && <Modal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}

function Modal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const modal = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      gsap.from(".modal-box", {
        opacity: 0,
        scale: 0.95,
        y: 20,
        duration: 0.4,
        ease: "power3.out",
      });
    },
    { scope: modal }
  );

  useEffect(() => {
    const lenis = window.lenis;
    lenis?.stop();
    return () => {
      lenis?.start();
    };
  }, []);

  // Escape se band ho, aur khulte hi focus close button pe (keyboard users ke liye)
  useEffect(() => {
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      ref={modal}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm md:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="modal-box flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl shadow-black/50"
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-neutral-800 py-3 pl-6 pr-3">
          <h3 id="project-modal-title" className="truncate text-lg font-semibold text-white">
            {project.title}
          </h3>
          <button ref={closeBtn} onClick={onClose} className={iconBtn} aria-label="Close">
            <FiX className="text-lg" />
          </button>
        </div>

        {/* Poora modal scroll hota hai (lambi image/description cut na ho) */}
        <div className="overflow-y-auto overscroll-contain" data-lenis-prevent>
          {project.image && (
            <div className="border-b border-neutral-800 bg-neutral-900">
              <img src={project.image} alt={project.title} className="w-full" />
            </div>
          )}

          <div className="p-6 md:p-8">
            {project.description && (
              <p className="leading-relaxed text-neutral-300">{project.description}</p>
            )}

            {project.tech.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
                {project.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1 text-xs text-neutral-400"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            )}

            {/* Link na ho to button mat dikhao */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 ${btnPrimary} h-11 px-6 text-sm`}
              >
                Visit Site <FiArrowUpRight aria-hidden />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
