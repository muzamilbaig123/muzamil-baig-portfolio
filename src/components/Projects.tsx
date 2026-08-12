import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { projects, type Project } from "../data/content";
import { FiArrowUpRight, FiX } from "react-icons/fi";

export default function Projects() {
  const container = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section
      ref={container}
      id="projects"
      className="mx-auto max-w-6xl px-6 py-32 md:px-16"
    >
      <div className="mb-16">
        <p className="mb-3 text-sm uppercase tracking-widest text-neutral-500">
          Projects
        </p>
        <h2 className="text-3xl font-semibold text-white md:text-5xl">
          Selected work
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <button
            key={project.title}
            onClick={() => setActive(project)}
            className="project-card group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 text-left transition-colors hover:border-neutral-600"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between p-6">
              <h3 className="text-xl font-semibold text-white">
                {project.title}
              </h3>
              <FiArrowUpRight className="text-neutral-500 transition-colors group-hover:text-white" />
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
    const lenis = (window as any).lenis;
    lenis?.stop();
    return () => {
      lenis?.start();
    };
  }, []);

  return (
    <div
      ref={modal}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-box max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950"
      >
        <div className="flex items-center justify-between border-b border-neutral-800 p-5">
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-white">
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto" data-lenis-prevent>
          <img src={project.image} alt={project.title} className="w-full" />
        </div>

        <div className="p-6">
          <p className="text-neutral-400">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-400"
              >
                {t}
              </span>
            ))}
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
          >
            Visit Site <FiArrowUpRight />
          </a>
        </div>
      </div>
    </div>
  );
}