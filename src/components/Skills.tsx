import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { fetchSkills } from "../api/portfolio";
import { useFetch } from "../hooks/useFetch";
import SectionStatus from "./SectionStatus";
import SectionHeader from "./SectionHeader";
import { SkillsSkeleton } from "./Skeletons";
import { section } from "../styles/ui";

export default function Skills() {
  const container = useRef<HTMLElement>(null);

  // Skills API se (GET /api/skills), category ke hisaab se grouped
  const { data: skills, loading, error, reload } = useFetch(fetchSkills);

  useGSAP(
    () => {
      // Data aane se pehle cards DOM me hain hi nahi, to animation ka faida nahi
      if (!skills) return;

      gsap.from(".skill-heading", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: container.current, start: "top 80%" },
      });

      // Har category group ka apna trigger
      const groups = gsap.utils.toArray<HTMLElement>(".skill-group");

      groups.forEach((group) => {
        const cards = group.querySelectorAll(".skill-card");
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: group, start: "top 90%" },
          }
        );
      });

      // Section ki height badal gayi, saare scroll triggers ki positions update karo
      ScrollTrigger.refresh();
    },
    // dependencies: skills aane pe animation dobara set ho
    // revertOnUpdate: purani animations hata ke nayi lagao
    { scope: container, dependencies: [skills], revertOnUpdate: true }
  );

  return (
    <section ref={container} id="skills" className={section}>
      <SectionHeader eyebrow="Skills" title="Technologies I work with" className="skill-heading" />

      <SectionStatus
        loading={loading}
        error={error}
        isEmpty={skills?.length === 0}
        emptyText="No skills added yet."
        onRetry={reload}
        skeleton={<SkillsSkeleton />}
        label="skills"
      />

      <div className="space-y-12 md:space-y-14">
        {skills?.map((group) => (
          <div key={group.category} className="skill-group">
            <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 md:mb-6">
              {group.category}
            </h3>
            <div className="skill-grid grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {group.items.map((item) => (
                // .skill-card ko GSAP animate karta hai (inline transform lagata hai),
                // isliye hover lift andar wale div pe hai, warna hover kaam nahi karta
                <div key={item.id} className="skill-card">
                  <div className="group flex h-full flex-col items-start gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/30 p-5 transition duration-300 ease-out hover:-translate-y-1 hover:border-neutral-600 hover:bg-neutral-900/60 md:p-6">
                    <item.icon className="text-3xl text-neutral-400 transition-colors duration-300 group-hover:text-white" aria-hidden />
                    <span className="text-sm font-medium text-neutral-300 transition-colors duration-300 group-hover:text-white md:text-base">
                      {item.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
