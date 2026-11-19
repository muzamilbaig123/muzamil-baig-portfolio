import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { fetchExperience } from "../api/portfolio";
import { useFetch } from "../hooks/useFetch";
import SectionStatus from "./SectionStatus";
import SectionHeader from "./SectionHeader";
import { ExperienceSkeleton } from "./Skeletons";
import { section } from "../styles/ui";

export default function Experience() {
  const container = useRef<HTMLElement>(null);

  // Experience API se (GET /api/experience). points = description ki lines
  const { data: experience, loading, error, reload } = useFetch(fetchExperience);

  useGSAP(
    () => {
      if (!experience) return; // data aane tak animate karne ko kuch nahi

      gsap.from(".exp-item", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      });

      ScrollTrigger.refresh();
    },
    { scope: container, dependencies: [experience], revertOnUpdate: true }
  );

  return (
    <section ref={container} id="experience" className={section}>
      <SectionHeader eyebrow="Experience" title="Where I've worked" />

      <SectionStatus
        loading={loading}
        error={error}
        isEmpty={experience?.length === 0}
        emptyText="No experience added yet."
        onRetry={reload}
        skeleton={<ExperienceSkeleton />}
        label="experience"
      />

      <div className="max-w-3xl space-y-14">
        {experience?.map((item) => (
          <div
            key={item.id}
            className="exp-item relative border-l border-neutral-800 pl-8 md:pl-10"
          >
            {/* Timeline ka dot */}
            <span
              aria-hidden
              className="absolute -left-[5px] top-2.5 h-[9px] w-[9px] rounded-full bg-neutral-400 ring-4 ring-neutral-950"
            />

            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                {item.role}
              </h3>
              {item.period && (
                <span className="rounded-full border border-neutral-800 px-3 py-1 text-xs text-neutral-400">
                  {item.period}
                </span>
              )}
            </div>

            <p className="mt-1.5 text-base text-neutral-400 md:text-lg">{item.company}</p>

            {item.points.length > 0 && (
              <ul className="mt-6 space-y-3">
                {item.points.map((point, i) => (
                  // before: = chhoti dash bullet
                  <li
                    key={i}
                    className="relative pl-6 leading-relaxed text-neutral-400 before:absolute before:left-0 before:top-[0.8em] before:h-px before:w-3 before:bg-neutral-600"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
