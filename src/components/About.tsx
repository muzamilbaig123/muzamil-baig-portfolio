import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { personal } from "../data/content";

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
    <section
      ref={container}
      id="about"
      className="mx-auto max-w-4xl px-6 py-32 md:px-16"
    >
      <h2 className="about-heading mb-8 text-sm uppercase tracking-widest text-white">
        About
      </h2>

      <p className="about-text text-2xl leading-relaxed text-neutral-200 md:text-4xl md:leading-relaxed">
        {personal.about.split(" ").map((word, i) => (
          <span key={i} className="about-word inline-block opacity-20">
            {word}&nbsp;
          </span>
        ))}
      </p>
    </section>
  );
}