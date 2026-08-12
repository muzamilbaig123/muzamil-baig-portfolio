import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { experience } from "../data/content";

export default function Experience() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
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
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="experience"
      className="mx-auto max-w-4xl px-6 py-32 md:px-16"
    >
      <h2 className="mb-16 text-sm uppercase tracking-widest text-neutral-500">
        Experience
      </h2>

      <div className="space-y-12">
        {experience.map((item) => (
          <div
            key={item.company}
            className="exp-item border-l border-neutral-800 pl-8"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-2xl font-semibold text-white">
                {item.role}
              </h3>
              <span className="text-sm text-neutral-500">{item.period}</span>
            </div>

            <p className="mt-1 text-lg text-neutral-400">{item.company}</p>

            <ul className="mt-6 space-y-3">
              {item.points.map((point, i) => (
                <li key={i} className="text-neutral-400">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}