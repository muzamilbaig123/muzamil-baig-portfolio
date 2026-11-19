import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { FiAlertCircle, FiCheck, FiX } from "react-icons/fi";
import { ToastContext, type ToastApi } from "./toast";

type Toast = { id: number; type: "success" | "error"; message: string };

const DURATION = 4000;

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (type: Toast["type"], message: string) => {
      const id = ++nextId.current;
      // Zyada se zyada 3 toasts ek waqt me
      setToasts((list) => [...list.slice(-2), { id, type, message }]);
      window.setTimeout(() => dismiss(id), DURATION);
    },
    [dismiss],
  );

  const api = useMemo<ToastApi>(
    () => ({
      success: (m) => show("success", m),
      error: (m) => show("error", m),
    }),
    [show],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}

      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-70 flex flex-col items-stretch gap-2 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-80"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role={t.type === "error" ? "alert" : "status"}
            className="anim-toast-in pointer-events-auto flex items-start gap-3 rounded-xl border border-neutral-800 bg-neutral-900/95 py-3 pl-4 pr-2 shadow-2xl shadow-black/50 backdrop-blur"
          >
            <span
              className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-xs ${
                t.type === "success"
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-red-500/15 text-red-400"
              }`}
            >
              {t.type === "success" ? (
                <FiCheck aria-hidden />
              ) : (
                <FiAlertCircle aria-hidden />
              )}
            </span>
            <p className="flex-1 pt-px text-sm leading-relaxed text-neutral-200">
              {t.message}
            </p>
            <button
              onClick={() => dismiss(t.id)}
              className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-neutral-500 transition hover:bg-white/6 hover:text-white"
              aria-label="Dismiss"
            >
              <FiX className="text-sm" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
