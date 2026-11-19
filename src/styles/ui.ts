// ============================================================
// styles/ui.ts
// Design tokens: public site aur admin panel dono yahi classes use karte hain,
// taake buttons, inputs, cards sab jagah bilkul ek jaise dikhen.
//
// Palette (Tailwind neutral):
//   background  neutral-950      surface  neutral-900/40     border  neutral-800
//   text        white / 300 / 400 (secondary) / 500 (muted)
//   accent      white (primary button)     danger  red-400/500
// Radius: cards = 2xl, inputs = xl, buttons = full (pill)
// ============================================================

// ---------- Layout ----------

/** Har public section ka container: same width, same padding */
export const section = "mx-auto w-full max-w-6xl px-6 py-24 md:px-12 md:py-32";

/** Chhota uppercase label headings ke upar ("PROJECTS") */
export const eyebrow = "text-xs font-medium uppercase tracking-[0.2em] text-neutral-400";

/** Section ka bara heading */
export const heading = "text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl";

/** Card / panel */
export const card = "rounded-2xl border border-neutral-800 bg-neutral-900/40";

// ---------- Buttons ----------

const btn =
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition duration-200 ease-out disabled:pointer-events-none disabled:opacity-50";

/** Size class hamesha kisi variant ke saath lagao: `${btnPrimary} ${btnMd}` */
export const btnSm = "h-8 px-3.5 text-xs";
export const btnMd = "h-10 px-5 text-sm";
export const btnLg = "h-12 px-7 text-base";

/** Main action (safed pill) */
export const btnPrimary = `${btn} bg-white text-neutral-950 hover:bg-neutral-200 active:bg-neutral-300`;
/** Doosra action (outline pill) */
export const btnSecondary = `${btn} border border-neutral-700 text-white hover:border-neutral-400 hover:bg-white/4`;
/** Kam ahem action (sirf text) */
export const btnGhost = `${btn} text-neutral-400 hover:bg-white/6 hover:text-white`;
/** Delete jaisa khatarnak action */
export const btnDanger = `${btn} bg-red-500 text-white hover:bg-red-400 active:bg-red-600`;

/** Gol icon button (edit/delete/close) */
export const iconBtn =
  "inline-grid h-9 w-9 shrink-0 place-items-center rounded-full text-neutral-400 transition duration-200 hover:bg-white/6 hover:text-white disabled:pointer-events-none disabled:opacity-50";
export const iconBtnDanger =
  "inline-grid h-9 w-9 shrink-0 place-items-center rounded-full text-neutral-400 transition duration-200 hover:bg-red-500/10 hover:text-red-400 disabled:pointer-events-none disabled:opacity-50";

// ---------- Form inputs ----------
// text-base mobile pe: iOS 16px se chhote input pe zoom kar deta hai

const inputBase =
  "block w-full rounded-xl border bg-neutral-900/50 px-4 py-3 text-base text-white placeholder:text-neutral-600 transition duration-200 focus:bg-neutral-900 focus:outline-none focus:ring-4 md:text-[15px]";

export const input = `${inputBase} border-neutral-800 hover:border-neutral-700 focus:border-neutral-500 focus:ring-white/6`;
export const inputInvalid = `${inputBase} border-red-500/60 hover:border-red-500/80 focus:border-red-400 focus:ring-red-500/15`;

export const label = "mb-2 block text-sm font-medium text-neutral-300";
export const fieldError = "mt-2 flex items-start gap-1.5 text-sm text-red-400";
export const fieldHint = "mt-2 text-xs text-neutral-500";

// ---------- Alerts ----------

const alertBase = "flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm leading-relaxed";
export const alertError = `${alertBase} border-red-500/25 bg-red-500/8 text-red-300`;
export const alertWarning = `${alertBase} border-amber-500/25 bg-amber-500/8 text-amber-200`;
export const alertSuccess = `${alertBase} border-emerald-500/25 bg-emerald-500/8 text-emerald-300`;
