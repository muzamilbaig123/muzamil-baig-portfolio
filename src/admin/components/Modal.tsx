import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import { iconBtn } from "../../styles/ui";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md";
  closeOnOverlay?: boolean;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // peeche ka scroll band

    const panel = panelRef.current;
    const first =
      panel?.querySelector<HTMLElement>("[data-autofocus]") ??
      panel?.querySelector<HTMLElement>("input, textarea, select") ??
      panel?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      // Focus trap: aakhri element ke baad Tab -> pehla, pehle se Shift+Tab -> aakhri
      if (e.key === "Tab" && panel) {
        const items = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)];
        if (!items.length) return;
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  // Portal: modal ko <body> ke end me render karo taake koi parent ka overflow/z-index na kaate
  return createPortal(
    <div className="fixed inset-0 z-60 flex items-end justify-center p-0 sm:items-center sm:p-6">
      {/* Overlay */}
      <div
        className="anim-fade-in absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeOnOverlay ? () => onCloseRef.current() : undefined}
        aria-hidden
      />

      {/* Panel: mobile pe neeche se sheet, desktop pe beech me */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? "modal-desc" : undefined}
        className={`anim-pop-in relative flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-2xl border border-neutral-800 bg-neutral-950 shadow-2xl shadow-black/60 sm:rounded-2xl ${
          size === "sm" ? "sm:max-w-md" : "sm:max-w-xl"
        }`}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 px-6 pb-2 pt-6">
          <div className="min-w-0">
            <h2
              id="modal-title"
              className="text-lg font-semibold tracking-tight text-white"
            >
              {title}
            </h2>
            {description && (
              <p
                id="modal-desc"
                className="mt-1 text-sm leading-relaxed text-neutral-400"
              >
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => onCloseRef.current()}
            className={`${iconBtn} -mr-2 -mt-1.5`}
            aria-label="Close"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        {/* Lamba form ho to sirf ye hissa scroll hota hai; header/footer jagah pe rehte hain */}
        <div className="overflow-y-auto overscroll-contain px-6 py-4">
          {children}
        </div>

        {footer && (
          <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-neutral-800/80 bg-neutral-900/30 px-6 py-4 sm:flex-row sm:justify-end">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
