import { useGSAP } from "@gsap/react";
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
  useGSAP(() => {
    gsap.from(".nav-item", {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
      delay: 0.2,
    });
  });

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-16">
        <a
          href="#home"
          className="nav-item text-lg font-bold tracking-tight text-white"
        >
          {personal.name.split(" ")[0]}
          <span className="text-neutral-500">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-item text-sm text-whites transition-colors hover:text-white"
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
          className="nav-item rounded-full border border-neutral-700 px-4 py-2 text-sm text-white transition hover:border-neutral-400"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
