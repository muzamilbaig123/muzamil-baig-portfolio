import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { personal } from "../data/content";

export default function About() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-reveal", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
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
      <h2 className="about-reveal mb-8 text-md uppercase tracking-widest text-neutral-500">
        About
      </h2>

      <p className="about-reveal text-2xl leading-relaxed text-neutral-200 md:text-4xl md:leading-relaxed">
        {personal.about}
      </p>
    </section>
  );
}