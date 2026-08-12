import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { personal } from "../data/content";
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight } from "react-icons/fi";

export default function Contact() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".contact-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="contact"
      className="mx-auto max-w-4xl px-6 py-32 text-center md:px-16"
    >
      <h2 className="contact-reveal mb-6 text-sm uppercase tracking-widest text-white">
        Contact
      </h2>

      <p className="contact-reveal text-4xl font-bold text-white md:text-6xl">
        Let's work together.
      </p>
      <a
        href={`mailto:${personal.email}`}
        className="contact-reveal group mt-8 inline-flex items-center gap-3 text-lg text-white transition-colors hover:text-white"
      >
        <FiMail className="text-xl" />
        {personal.email}
      </a>

      <div className="contact-reveal mt-12 flex justify-center gap-4">
        <a
          href={personal.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm text-white transition-all duration-300 hover:-translate-y-1 hover:border-neutral-400"
        >
          <FiGithub className="text-lg" />
          GitHub
          <FiArrowUpRight className="text-neutral-500 transition-colors group-hover:text-white" />
        </a>
        <a
          href={personal.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm text-white transition-all duration-300 hover:-translate-y-1 hover:border-neutral-400"
        >
          <FiLinkedin className="text-lg" />
          LinkedIn
          <FiArrowUpRight className="text-neutral-500 transition-colors group-hover:text-white" />
        </a>
      </div>

      <p className="contact-reveal mt-24 text-sm text-white">
        © {new Date().getFullYear()} {personal.name}. Built with React & GSAP.
      </p>
    </section>
  );
}
