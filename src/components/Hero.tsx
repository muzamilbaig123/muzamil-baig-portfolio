import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { personal } from "../data/content";
import { FiArrowDown } from "react-icons/fi";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(".hero-role", { opacity: 0, y: 20, duration: 0.8 })
        .from(
          ".hero-word",
          { yPercent: 120, duration: 1.2, stagger: 0.12 },
          "-=0.3",
        )
        .from(".hero-tagline", { opacity: 0, y: 30, duration: 1 }, "-=0.7")
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          "-=0.6",
        )
        .from(
          ".hero-visual",
          { opacity: 0, scale: 0.85, duration: 1.4 },
          "-=1.2",
        )
        .from(".hero-scroll", { opacity: 0, duration: 1 }, "-=0.4");

      gsap.to(".hero-ring", {
        rotate: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="home"
      className="relative flex min-h-screen items-center px-6 md:px-16 lg:px-24"
    >
      <div className="grid w-full items-center gap-16 lg:grid-cols-2">
        {/* left */}
        <div>
          <p className="hero-role mb-6 text-sm uppercase tracking-[0.25em] text-white ">
            {personal.role}
          </p>

          <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight text-white md:text-7xl lg:text-8xl">
            {personal.name.split(" ").map((word, i) => (
              <span key={i} className="block overflow-hidden pb-2">
                <span className="hero-word inline-block">{word}</span>
              </span>
            ))}
          </h1>

          <p className="hero-tagline mt-8 max-w-md text-lg leading-relaxed text-white">
            {personal.tagline}
          </p>

          <div className="mt-10 flex gap-4">
            <a
              href="#projects"
              className="hero-cta rounded-full bg-white px-7 py-3.5 text-lg font-medium text-neutral-950 transition hover:bg-neutral-200"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="hero-cta rounded-full border border-neutral-700 px-7 py-3.5 text-lg font-medium text-white transition hover:border-neutral-400"
            >
              Get in Touch
            </a>
          </div>
        </div>

        <div className="hero-visual hidden justify-center lg:flex">
          <HeroVisual />
        </div>
      </div>

      <div className="hero-scroll absolute bottom-10 left-6 flex items-center gap-2 text-sm text-white md:left-16 lg:left-1/2">
        <FiArrowDown className="animate-bounce text-white" />
        Scroll to explore
      </div>
    </section>
  );
}
