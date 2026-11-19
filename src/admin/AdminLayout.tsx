import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import type { IconType } from "react-icons";
import {
  FiBriefcase,
  FiExternalLink,
  FiFolder,
  FiGrid,
  FiLogOut,
  FiMail,
  FiMenu,
  FiX,
  FiZap,
} from "react-icons/fi";
import { clearToken } from "../api/auth";
import ToastProvider from "./components/ToastProvider";
import { iconBtn } from "../styles/ui";

type NavItem = { to: string; label: string; icon: IconType; end?: boolean };

const navGroups: { title: string; items: NavItem[] }[] = [
  {
    title: "Overview",
    items: [{ to: "/admin", label: "Dashboard", icon: FiGrid, end: true }],
  },
  {
    title: "Content",
    items: [
      { to: "/admin/projects", label: "Projects", icon: FiFolder },
      { to: "/admin/skills", label: "Skills", icon: FiZap },
      { to: "/admin/experience", label: "Experience", icon: FiBriefcase },
    ],
  },
  {
    title: "Inbox",
    items: [{ to: "/admin/messages", label: "Messages", icon: FiMail }],
  },
];

/** Logo + naam (sidebar aur mobile bar dono me) */
function Brand() {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/logo.png"
        alt=""
        className="h-9 w-9 rounded-lg border border-neutral-800 object-cover"
      />
      <div className="leading-tight">
        <p className="text-sm font-semibold text-white">Muzamil Baig</p>
        <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
          Admin
        </p>
      </div>
    </div>
  );
}

/** Sidebar ka andar ka content (desktop aside aur mobile drawer dono me same) */
function SidebarContent({
  onNavigate,
  onLogout,
}: {
  onNavigate?: () => void;
  onLogout: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="px-5 pb-6 pt-6">
        <Brand />
      </div>

      <nav className="flex-1 space-y-7 overflow-y-auto px-3" aria-label="Admin">
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-600">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map(({ to, label, icon: Icon, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition duration-200 ${
                        isActive
                          ? "bg-white/7 font-medium text-white"
                          : "text-neutral-400 hover:bg-white/3 hover:text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Active page ki left side pe safed patti */}
                        {isActive && (
                          <span
                            aria-hidden
                            className="absolute -left-3 top-1/2 h-5 w-0.75 -translate-y-1/2 rounded-r-full bg-white"
                          />
                        )}
                        <Icon
                          className={`text-[17px] ${isActive ? "text-white" : "text-neutral-500 group-hover:text-neutral-300"}`}
                          aria-hidden
                        />
                        {label}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="space-y-0.5 border-t border-neutral-900 p-3">
        {/* Full page link: public site apne GSAP/Lenis ke saath fresh load ho */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-neutral-400 transition hover:bg-white/3 hover:text-white"
        >
          <FiExternalLink
            className="text-[17px] text-neutral-500"
            aria-hidden
          />{" "}
          View site
        </a>
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-neutral-400 transition hover:bg-red-500/8 hover:text-red-300"
        >
          <FiLogOut className="text-[17px] text-neutral-500" aria-hidden /> Log
          out
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  function logout() {
    clearToken(); // token hata do
    navigate("/admin/login", { replace: true });
  }

  // Drawer khula ho to: Escape se band, aur peeche ka page scroll na ho
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setDrawerOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-neutral-950 text-neutral-200">
        {/* ---- Desktop sidebar ---- */}
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-neutral-900 bg-neutral-950 lg:block">
          <SidebarContent onLogout={logout} />
        </aside>

        {/* ---- Mobile top bar ---- */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-neutral-900 bg-neutral-950/85 px-4 backdrop-blur-md lg:hidden">
          <Brand />
          <button
            onClick={() => setDrawerOpen(true)}
            className={iconBtn}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            aria-controls="admin-drawer"
          >
            <FiMenu className="text-xl" />
          </button>
        </header>

        {/* ---- Mobile drawer ---- */}
        {drawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="anim-fade-in absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
              aria-hidden
            />
            <aside
              id="admin-drawer"
              className="anim-slide-in-left absolute inset-y-0 left-0 w-72 max-w-[85vw] border-r border-neutral-900 bg-neutral-950 shadow-2xl shadow-black/60"
            >
              <button
                onClick={() => setDrawerOpen(false)}
                className={`${iconBtn} absolute right-3 top-5`}
                aria-label="Close menu"
              >
                <FiX className="text-lg" />
              </button>
              <SidebarContent
                onNavigate={() => setDrawerOpen(false)}
                onLogout={logout}
              />
            </aside>
          </div>
        )}

        {/* ---- Page content ---- */}
        <main className="lg:pl-64">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:px-10 md:py-12">
            <Outlet />
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}
