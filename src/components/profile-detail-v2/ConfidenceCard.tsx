import MaterialIcon from "@/components/shared/MaterialIcon";

export default function ConfidenceCard() {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
            Latest Match Confidence
          </div>
        </div>
        <MaterialIcon name="fingerprint" className="text-[20px] text-on-surface-variant" />
      </div>

      <div className="mt-5 flex items-end gap-3">
        <div className="text-[44px] font-bold tracking-[-0.05em] text-primary">
          99.8%
        </div>
        <span className="mb-2 rounded-full bg-primary-container px-2.5 py-1 font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-primary-container">
          HIGH
        </span>
      </div>

      <div className="mt-4 h-1.5 w-full rounded-full bg-surface-container-high">
        <div className="h-full w-[96%] rounded-full bg-primary" />
      </div>

      <div className="mt-4 font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
        Algorithm: MZ-V4-Facial
      </div>
    </section>
  );
}
