"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { personal } from "../data/content";
import { btnSecondary, btnSm } from "../styles/ui";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef(null);

  // Scroll hone pe navbar ke peeche halka blur background, taake content ke upar text saaf parha jaye
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".nav-item",
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.2,
        }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled ? "border-white/6 bg-neutral-950/75 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:px-12">
        <a href="#home" className="nav-item rounded-lg opacity-0" aria-label="Back to top">
          <img src="/logo.png" alt="Muzamil Baig logo" className="h-14 w-auto md:h-16" />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              {/* after: = neeche patli line jo hover pe left se phailti hai */}
              <a
                href={link.href}
                className="nav-item relative py-1 text-sm text-neutral-400 opacity-0 transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:text-white hover:after:scale-x-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={personal.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`nav-item opacity-0 ${btnSecondary} ${btnSm} md:h-9 md:px-4 md:text-sm`}
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
