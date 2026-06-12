import MaterialIcon from "@/components/shared/MaterialIcon";

export default function ThreatLevelCard() {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container p-4">
      <div className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
        Threat Level
      </div>
      <div className="mt-4 flex items-center gap-2">
        <MaterialIcon name="warning" className="text-[20px] text-error" />
        <div className="text-[28px] font-bold tracking-[-0.04em] text-error">HIGH</div>
      </div>
    </section>
  );
}
