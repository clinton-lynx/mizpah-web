import type { ReactNode } from "react";

import MaterialIcon from "@/components/shared/MaterialIcon";

function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 font-label-mono text-[11px] font-semibold uppercase tracking-[0.05em] ${className}`}>
      {children}
    </span>
  );
}

export default function ProfileHeader() {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-primary-container text-[28px] font-bold text-white">
            AB
          </div>
          <div className="min-w-0">
            <h2 className="text-[30px] font-bold tracking-[-0.04em] text-on-surface">
              Adewale Balogun
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge className="bg-primary-container text-on-primary-container">Medical</Badge>
              <Badge className="border border-primary/35 bg-surface-container-low text-primary">Active</Badge>
            </div>
            <div className="mt-3 text-sm text-on-surface-variant">Enrolled 6 Jun 2026</div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-full border border-outline-variant px-4 py-2 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface">
            <MaterialIcon name="edit" className="text-[18px]" />
            Edit
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
