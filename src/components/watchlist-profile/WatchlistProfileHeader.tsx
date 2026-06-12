import MaterialIcon from "@/components/shared/MaterialIcon";

function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 font-label-mono text-[11px] uppercase tracking-[0.05em] ${className}`}>
      {children}
    </span>
  );
}

export default function WatchlistProfileHeader() {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-5">
          <div className="flex h-[90px] w-[90px] shrink-0 items-center justify-center rounded-lg bg-[#9f0b10] text-[34px] font-bold text-white">
            EO
          </div>
          <div className="min-w-0">
            <h2 className="text-[32px] font-bold tracking-[-0.04em] text-on-surface">
              Emeka Okafor
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge className="bg-error-container text-[#ffd7d2]">Watchlist</Badge>
              <Badge className="border border-primary/35 bg-surface-container-low text-primary">
                Active
              </Badge>
            </div>
            <div className="mt-3 text-sm text-on-surface-variant">Enrolled 7 Jun 2026</div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-full border border-outline-variant px-4 py-2 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface">
            <MaterialIcon name="edit" className="text-[18px]" />
            Edit Profile
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-outline-variant px-4 py-2 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface">
            <MaterialIcon name="share" className="text-[18px]" />
            Share Profile
          </button>
        </div>
      </div>
    </section>
  );
}
