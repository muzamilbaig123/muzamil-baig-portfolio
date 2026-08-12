import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { skills } from "../data/content";

export default function Skills() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".skill-chip", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="skills"
      className="mx-auto max-w-6xl px-6 py-32 md:px-16"
    >
      <h2 className="mb-16 text-sm uppercase tracking-widest text-neutral-500">
        Skills
      </h2>

      <div className="space-y-14">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="mb-6 text-lg font-semibold text-neutral-300">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="skill-chip flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/40 px-5 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-600 hover:bg-neutral-900"
                >
                  <item.icon className="text-xl text-neutral-300" />
                  <span className="text-sm text-neutral-300">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
