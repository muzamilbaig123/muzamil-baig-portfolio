import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { skills } from "../data/content";

export default function Skills() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
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
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="skills"
      className="mx-auto max-w-6xl px-6 py-32 md:px-16"
    >
      <div className="skill-heading mb-16">
        <p className="mb-3 text-sm uppercase tracking-widest text-white">
          Skills
        </p>
        <h2 className="text-3xl font-semibold text-white md:text-5xl">
          Technologies I work with
        </h2>
      </div>

      <div className="space-y-16">
        {skills.map((group) => (
          <div key={group.category} className="skill-group">
            <h3 className="mb-6 text-sm font-medium uppercase tracking-wider text-neutral-500">
              {group.category}
            </h3>
            <div className="skill-grid grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="skill-card group flex flex-col items-start gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-600 hover:bg-neutral-900/60"
                >
                  <item.icon className="text-3xl text-neutral-400 transition-colors duration-300 group-hover:text-white" />
                  <span className="text-base font-medium text-neutral-300">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}