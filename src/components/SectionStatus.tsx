// ============================================================
// components/SectionStatus.tsx
// Public sections (Projects, Skills, Experience) ke liye loading / error / empty UI.
// Loading pe section ki apni shape ka skeleton dikhta hai (Skeletons.tsx).
// ============================================================

import type { ReactNode } from "react";
import { FiAlertCircle, FiInbox, FiRefreshCw } from "react-icons/fi";
import { btnMd, btnSecondary } from "../styles/ui";

type Props = {
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  emptyText: string;
  onRetry: () => void;
  skeleton: ReactNode; // e.g. <ProjectsSkeleton />
  label: string; // "projects": error message me use hota hai
};

// Error aur empty dono ka frame ek jaisa: halki dashed border wala panel
const panel =
  "flex flex-col items-center rounded-2xl border border-dashed border-neutral-800 px-6 py-14 text-center";

/**
 * Agar loading/error/empty hai to woh UI return karta hai, warna null.
 * Section me use:  <SectionStatus ... />  aur uske baad asli content.
 */
export default function SectionStatus({ loading, error, isEmpty, emptyText, onRetry, skeleton, label }: Props) {
  if (loading) {
    return (
      <div aria-busy="true" aria-label={`Loading ${label}`}>
        {skeleton}
      </div>
    );
  }

  if (error) {
    return (
      <div className={panel} role="alert">
        <FiAlertCircle className="text-2xl text-neutral-500" aria-hidden />
        <p className="mt-4 font-medium text-white">Couldn't load {label}</p>
        <p className="mt-1 max-w-sm text-sm leading-relaxed text-neutral-500">{error}</p>
        <button onClick={onRetry} className={`mt-6 ${btnSecondary} ${btnMd}`}>
          <FiRefreshCw aria-hidden /> Try again
        </button>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className={panel}>
        <FiInbox className="text-2xl text-neutral-600" aria-hidden />
        <p className="mt-4 text-sm text-neutral-500">{emptyText}</p>
      </div>
    );
  }

  return null;
}
