import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { personal } from "../data/content";

export default function HeroVisual() {
  useGSAP(() => {
    gsap.to(".rotating-text", {
      rotate: 360,
      duration: 24,
      repeat: -1,
      ease: "none",
    });
  });

  const initials = personal.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  const circleText = "FRONTEND DEVELOPER · CREATIVE · ";

  return (
    <div className="relative flex aspect-square w-full max-w-sm items-center justify-center">
      <svg
        viewBox="0 0 200 200"
        className="rotating-text absolute h-full w-full origin-center"
      >
        <defs>
          <path
            id="circlePath"
            d="M 100, 100 m -78, 0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
            fill="none"
          />
        </defs>
        <text className="fill-white text-[10px] uppercase tracking-[0.3em]">
          <textPath href="#circlePath">{circleText.repeat(2)}</textPath>
        </text>
      </svg>

      <div className="absolute h-[68%] w-[68%] rounded-full border border-neutral-800" />

      <div className="flex h-[52%] w-[52%] items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/40 backdrop-blur-sm">
        <span className="text-3xl font-semibold tracking-tight text-white">
          {initials}
        </span>
      </div>
    </div>
  );
}
