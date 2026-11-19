/// <reference types="vite/client" />
declare module "lenis";

// .env variables ki typing, taake import.meta.env.VITE_API_URL pe autocomplete aur type check mile
interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// App.tsx Lenis instance ko window.lenis pe rakhta hai (Projects modal isay stop/start karta hai)
interface Window {
  lenis?: { stop: () => void; start: () => void };
}
