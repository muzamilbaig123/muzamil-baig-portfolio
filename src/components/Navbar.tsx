"use client";
import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { personal } from "../data/content";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef(null);

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
    <header ref={navRef} className="fixed top-0 left-0 z-50 w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-16">
        <a href="#home" className="nav-item opacity-0">
          <img
            src="/logo.png"
            alt="Muzamil Baig logo"
            className="h-20 w-auto"
          />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-item opacity-0 text-sm text-neutral-400 transition-colors hover:text-white"
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
          className="nav-item opacity-0 rounded-full border border-neutral-700 px-4 py-2 text-sm text-white transition hover:border-neutral-400"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}