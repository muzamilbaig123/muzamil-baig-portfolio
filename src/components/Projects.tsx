import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { projects } from "../data/content";

export default function Projects() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          },
        );
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="projects"
      className="mx-auto max-w-6xl px-6 py-32 md:px-16"
    >
      <h2 className="mb-16 text-sm uppercase tracking-widest text-neutral-500">
        Projects
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="project-card group rounded-2xl border border-neutral-800 bg-neutral-900/40 p-8 transition-colors hover:border-neutral-600"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-2xl font-semibold text-white">
                {project.title}
              </h3>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-500 transition-colors group-hover:text-white"
                ></a>
              )}
            </div>

            <p className="mt-4 text-neutral-400">{project.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
