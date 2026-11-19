import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { personal } from "../data/content";
import SectionHeader from "./SectionHeader";
import { section } from "../styles/ui";

export default function About() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-heading", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      });

      gsap.to(".about-word", {
        opacity: 1,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 80%",
          end: "bottom 60%",
          scrub: true,
        },
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="about" className={section}>
      <SectionHeader eyebrow="About" className="about-heading mb-8! md:mb-10!" />

      <p className="about-text max-w-4xl text-2xl leading-snug tracking-tight text-neutral-100 sm:text-3xl md:text-4xl md:leading-[1.3]">
        {personal.about.split(" ").map((word, i) => (
          <span key={i} className="about-word inline-block opacity-20">
            {word}&nbsp;
          </span>
        ))}
      </p>
    </section>
  );
}
