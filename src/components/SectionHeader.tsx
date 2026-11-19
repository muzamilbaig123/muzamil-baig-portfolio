// ============================================================
// components/SectionHeader.tsx
// Har section ka heading ek hi pattern me:
//   EYEBROW (chhota label)
//   Bara Title
// className se GSAP ki class (e.g. "skill-heading") pass kar sakte ho.
// ============================================================

import type { ReactNode } from "react";
import { eyebrow as eyebrowClass, heading } from "../styles/ui";

type Props = {
  eyebrow: string;
  title?: ReactNode; // na do to sirf eyebrow (About section)
  className?: string;
  center?: boolean;
};

export default function SectionHeader({ eyebrow, title, className = "", center }: Props) {
  return (
    <div className={`mb-12 md:mb-16 ${center ? "text-center" : ""} ${className}`}>
      {title ? (
        <>
          <p className={eyebrowClass}>{eyebrow}</p>
          <h2 className={`mt-4 ${heading}`}>{title}</h2>
        </>
      ) : (
        // Title na ho to eyebrow hi section ka heading hai (screen readers ke liye h2)
        <h2 className={eyebrowClass}>{eyebrow}</h2>
      )}
    </div>
  );
}
