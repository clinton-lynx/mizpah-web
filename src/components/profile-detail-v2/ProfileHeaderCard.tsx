import type { ReactNode } from "react";

import MaterialIcon from "@/components/shared/MaterialIcon";

function Pill({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 font-label-mono text-[11px] uppercase tracking-[0.05em] ${className}`}>
      {children}
    </span>
  );
}

export default function ProfileHeaderCard() {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-5">
          <div className="relative h-[100px] w-[100px] overflow-hidden rounded-lg border border-primary/30 bg-surface-container-high">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(89,219,199,0.25),transparent_40%),linear-gradient(180deg,rgba(16,20,21,0.1),rgba(0,0,0,0.35))]" />
            <div className="absolute inset-0 flex items-center justify-center text-[34px] font-bold text-on-surface-variant/60">
              AB
            </div>
          </div>

          <div className="min-w-0">
            <h2 className="text-[32px] font-bold tracking-[-0.04em] text-on-surface">
              Adewale Balogun
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Pill className="bg-primary-container text-on-primary-container">ID: AB-8924-M</Pill>
              <Pill className="border border-outline-variant bg-surface-container-low text-on-surface-variant">
                ORG: Executive Board
              </Pill>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <div className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
                  Clearance Level
                </div>
                <div className="mt-2 text-[18px] font-semibold tracking-[-0.02em] text-on-surface">
                  Level 5 (All Access)
                </div>
              </div>

              <div>
                <div className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
                  Last Known Location
                </div>
                <div className="mt-2 flex items-center gap-2 text-[18px] font-semibold tracking-[-0.02em] text-on-surface">
                  <MaterialIcon name="location_on" className="text-[18px] text-primary" />
                  Main Lobby - Cam 04
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-surface-container-low px-3 py-2 text-[12px] font-semibold tracking-[0.06em] text-primary">
            <MaterialIcon name="shield" className="text-[18px]" />
            CLEARED (VIP)
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
      </div>
    </section>
  );
}
