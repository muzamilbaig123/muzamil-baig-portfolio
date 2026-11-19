// ============================================================
// components/Skeletons.tsx
// Loading placeholders jo asli content ki shape jaise hain,
// taake data aane pe layout jhatka na khaye.
// ".skeleton" class (index.css) halki chamak (shimmer) deti hai.
// ============================================================

/** Projects: 2-column cards (image + title + tech line) */
export function ProjectsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40">
          <div className="skeleton aspect-video" />
          <div className="space-y-3 p-5 md:p-6">
            <div className="skeleton h-5 w-2/5 rounded-md" />
            <div className="skeleton h-3.5 w-1/3 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Skills: category label + chhote tiles */
export function SkillsSkeleton() {
  return (
    <div className="space-y-12 md:space-y-14">
      {[0, 1].map((g) => (
        <div key={g}>
          <div className="skeleton mb-6 h-3 w-24 rounded" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-5 md:p-6">
                <div className="skeleton h-8 w-8 rounded-lg" />
                <div className="skeleton mt-4 h-4 w-20 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Experience: timeline item (role, company, points) */
export function ExperienceSkeleton() {
  return (
    <div className="max-w-3xl border-l border-neutral-800 pl-8">
      <div className="skeleton h-7 w-2/3 rounded-md" />
      <div className="skeleton mt-3 h-4 w-1/3 rounded-md" />
      <div className="mt-8 space-y-3">
        <div className="skeleton h-4 w-full rounded-md" />
        <div className="skeleton h-4 w-11/12 rounded-md" />
        <div className="skeleton h-4 w-4/5 rounded-md" />
      </div>
    </div>
  );
}
