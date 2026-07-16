// Skeleton loader for job cards
export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5 flex flex-col gap-4 animate-pulse">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 shrink-0" />
          <div className="space-y-2">
            <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-4 w-36 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
        <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700" />
      </div>

      {/* Badge */}
      <div className="h-5 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />

      {/* Description lines */}
      <div className="space-y-2 flex-1">
        <div className="h-3 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-3 w-4/6 rounded bg-slate-200 dark:bg-slate-700" />
      </div>

      {/* Meta */}
      <div className="grid grid-cols-2 gap-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-3 rounded bg-slate-200 dark:bg-slate-700" />
        ))}
      </div>

      {/* Skills */}
      <div className="flex gap-1.5">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-5 w-12 rounded bg-slate-200 dark:bg-slate-700" />
        ))}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60">
        <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 9 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {[...Array(count)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
