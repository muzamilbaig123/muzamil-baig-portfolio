import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { personal } from "../data/content";
import { FiArrowDown } from "react-icons/fi";
import HeroVisual from "./HeroVisual";
import { btnLg, btnPrimary, btnSecondary } from "../styles/ui";

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
      className="relative flex min-h-[100svh] items-center"
    >
      {/* Baaki sections jaisa container, taake sab ka left edge ek line me ho */}
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 px-6 pb-28 pt-32 md:px-12 lg:grid-cols-[1.15fr_1fr]">
        {/* left */}
        <div>
          <p className="hero-role mb-6 text-xs font-medium uppercase tracking-[0.2em] text-neutral-300 md:text-sm">
            {personal.role}
          </p>

          <h1 className="text-[3.25rem] font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            {personal.name.split(" ").map((word, i) => (
              <span key={i} className="mr-[0.2em] inline-block overflow-hidden pb-2">
                <span className="hero-word inline-block">{word}</span>
              </span>
            ))}
          </h1>

          <p className="hero-tagline mt-8 max-w-lg text-base leading-relaxed text-neutral-300 md:text-lg">
            {personal.tagline}
          </p>

          <div className="mt-10 flex flex-wrap gap-3 sm:gap-4">
            <a href="#projects" className={`hero-cta ${btnPrimary} ${btnLg}`}>
              View Work
            </a>
            <a href="#contact" className={`hero-cta ${btnSecondary} ${btnLg}`}>
              Get in Touch
            </a>
          </div>
        </div>

        <div className="hero-visual hidden justify-center lg:flex">
          <HeroVisual />
        </div>
      </div>

      {/* Center karne ke liye flex (transform nahi), kyunki GSAP is element ko animate karta hai */}
      <div className="hero-scroll pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
        <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
          <FiArrowDown className="animate-bounce text-neutral-300" aria-hidden />
          Scroll to explore
        </span>
      </div>
    </section>
  );
}
