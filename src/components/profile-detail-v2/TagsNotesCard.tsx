import MaterialIcon from "@/components/shared/MaterialIcon";
import type { ReactNode } from "react";

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-outline-variant bg-surface-container-low px-3 py-1.5 text-sm text-on-surface">
      {children}
    </span>
  );
}

export default function TagsNotesCard() {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
          Profile Tags &amp; Notes
        </div>
        <MaterialIcon name="edit" className="text-[18px] text-primary" />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Tag>Board Member</Tag>
        <Tag>No Escort Required</Tag>
        <Tag>Parking: VIP-A</Tag>
      </div>

      <p className="mt-5 max-w-[560px] text-sm leading-6 text-on-surface-variant">
        Subject is a primary stakeholder. Notify reception immediately upon entry
        detection at any perimeter gate.
      </p>
    </section>
  );
}
