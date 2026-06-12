export default function StatusCard() {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container p-4 border-l-[3px] border-l-primary">
      <div className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
        Status
      </div>
      <div className="mt-4 text-[18px] font-semibold tracking-[-0.02em] text-primary">
        Under surveillance
      </div>
    </section>
  );
}
