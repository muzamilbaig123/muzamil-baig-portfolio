// ============================================================
// admin/pages/DashboardPage.tsx
// Overview: har resource me kitne items hain + latest messages.
// ============================================================

import { Link } from "react-router";
import type { IconType } from "react-icons";
import { FiArrowRight, FiBriefcase, FiFolder, FiMail, FiRefreshCw, FiZap } from "react-icons/fi";
import { experienceApi, messagesApi, projectsApi, skillsApi } from "../../api/admin";
import { useFetch } from "../../hooks/useFetch";
import PageHeader from "../components/PageHeader";
import { btnGhost, btnSecondary, btnSm, card } from "../../styles/ui";
import { formatDate } from "../format";

// Component ke bahar define kiya taake useFetch ko stable function mile.
// Promise.all: chaaron requests ek saath (parallel) jati hain.
async function fetchOverview() {
  const [projects, skills, experience, messages] = await Promise.all([
    projectsApi.list(),
    skillsApi.list(),
    experienceApi.list(),
    messagesApi.list(),
  ]);
  return {
    counts: {
      projects: projects.length,
      skills: skills.length,
      experience: experience.length,
      messages: messages.length,
    },
    recentMessages: messages.slice(0, 3), // API pehle se newest-first deti hai
  };
}

const stats: { key: "projects" | "skills" | "experience" | "messages"; label: string; to: string; icon: IconType }[] = [
  { key: "projects", label: "Projects", to: "/admin/projects", icon: FiFolder },
  { key: "skills", label: "Skills", to: "/admin/skills", icon: FiZap },
  { key: "experience", label: "Experience", to: "/admin/experience", icon: FiBriefcase },
  { key: "messages", label: "Messages", to: "/admin/messages", icon: FiMail },
];

export default function DashboardPage() {
  const { data, loading, error, reload } = useFetch(fetchOverview);

  return (
    <div>
      <PageHeader eyebrow="Overview" title="Dashboard" description="A quick look at everything on your portfolio." />

      {error && (
        <div
          role="alert"
          className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-red-500/25 bg-red-500/8 px-4 py-3 text-sm text-red-300"
        >
          <span>{error}</span>
          <button onClick={reload} className={`${btnSecondary} ${btnSm} shrink-0`}>
            <FiRefreshCw aria-hidden /> Retry
          </button>
        </div>
      )}

      {/* ---- Count cards ---- */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map(({ key, label, to, icon: Icon }) => (
          <Link
            key={key}
            to={to}
            className={`${card} group flex flex-col p-5 transition duration-300 hover:-translate-y-0.5 hover:border-neutral-600 hover:bg-neutral-900/70 md:p-6`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-400">{label}</span>
              <Icon className="text-neutral-600 transition-colors group-hover:text-neutral-300" aria-hidden />
            </div>
            {loading ? (
              <span className="skeleton mt-4 h-9 w-12 rounded-md" aria-label="Loading" />
            ) : (
              <span className="mt-4 text-4xl font-semibold tracking-tight text-white tabular-nums">
                {data?.counts[key] ?? "–"}
              </span>
            )}
            <span className="mt-4 flex items-center gap-1.5 text-xs text-neutral-500 transition-colors group-hover:text-white">
              Manage <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Link>
        ))}
      </div>

      {/* ---- Latest messages ---- */}
      <section className={`${card} mt-6 md:mt-8`}>
        <div className="flex items-center justify-between border-b border-neutral-800 px-5 py-4 md:px-6">
          <h2 className="font-semibold text-white">Latest messages</h2>
          <Link to="/admin/messages" className={`${btnGhost} ${btnSm}`}>
            View all <FiArrowRight aria-hidden />
          </Link>
        </div>

        {loading ? (
          <div className="space-y-5 p-5 md:p-6">
            {[0, 1].map((i) => (
              <div key={i} className="space-y-2">
                <div className="skeleton h-4 w-32 rounded" />
                <div className="skeleton h-3.5 w-3/4 rounded" />
              </div>
            ))}
          </div>
        ) : !data?.recentMessages.length ? (
          <p className="px-5 py-10 text-center text-sm text-neutral-500 md:px-6">No messages yet.</p>
        ) : (
          <ul className="divide-y divide-neutral-800/70">
            {data.recentMessages.map((m) => (
              <li key={m.id} className="px-5 py-4 md:px-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="font-medium text-white">{m.name}</p>
                  <time dateTime={m.created_at} className="text-xs text-neutral-500">
                    {formatDate(m.created_at)}
                  </time>
                </div>
                {/* line-clamp: lamba message 1 line me kat jaye */}
                <p className="mt-1 line-clamp-1 text-sm text-neutral-400">{m.message}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
