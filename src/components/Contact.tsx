import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { personal } from "../data/content";
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight } from "react-icons/fi";
import ContactForm from "./ContactForm";
import { btnSecondary, eyebrow, section } from "../styles/ui";

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
      className={`${section} pb-12 text-center md:pb-12`}
    >
      <h2 className={`contact-reveal mb-5 ${eyebrow}`}>Contact</h2>

      <p className="contact-reveal text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
        Let's work together.
      </p>

      <a
        href={`mailto:${personal.email}`}
        className="contact-reveal group mt-8 inline-flex items-center gap-3 rounded-lg text-base text-neutral-300 transition-colors hover:text-white md:text-lg"
      >
        <FiMail className="text-xl" aria-hidden />
        {/* break-all: lamba email mobile pe screen se bahar na jaye */}
        <span className="break-all border-b border-neutral-700 pb-0.5 transition-colors group-hover:border-white">
          {personal.email}
        </span>
      </a>

      {/* Contact form (POST /api/messages) */}
      <div className="contact-reveal">
        <ContactForm />
      </div>

      <div className="contact-reveal mt-16 flex flex-wrap justify-center gap-3 sm:gap-4">
        <a
          href={personal.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`group ${btnSecondary} h-12 px-6 text-sm hover:-translate-y-0.5`}
        >
          <FiGithub className="text-lg" aria-hidden />
          GitHub
          <FiArrowUpRight className="text-neutral-500 transition-colors group-hover:text-white" aria-hidden />
        </a>
        <a
          href={personal.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`group ${btnSecondary} h-12 px-6 text-sm hover:-translate-y-0.5`}
        >
          <FiLinkedin className="text-lg" aria-hidden />
          LinkedIn
          <FiArrowUpRight className="text-neutral-500 transition-colors group-hover:text-white" aria-hidden />
        </a>
      </div>

      <footer className="contact-reveal mt-24 border-t border-neutral-900 pt-8 text-sm text-neutral-500">
        © {new Date().getFullYear()} {personal.name}. Built with React & GSAP.
      </footer>
    </section>
  );
}
